import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { Storage } from '@ionic/storage';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/user

  url: String = 'http://10.0.0.7:3000';
  headers: any;

  userAuth: boolean;
  showMenuEmitter = new EventEmitter<boolean>();
  userData: IUser;


  constructor(public http: HttpClient, private storage: Storage, public router: Router) {
    console.log('Hello UserProvider Provider');

    // Usado no Laravel
    // this.headers = {"headers": {"authorization": "Bearer " + this.token}};


    // Ao re-entrar ou no refresh deve-se checar a autenticação
    this.checkAuth();

    router.events.subscribe((event) => {

      if (event instanceof NavigationStart) {
        console.log('Alterou rota - checkAuth');
        this.checkAuth();
      }
      // if (event instanceof NavigationEnd) {
      // }
      // if (event instanceof NavigationError) {
      //   console.log(event.error);
      // }

    });

  }


  setStorage(key, value) {
    return this.storage.set(key, value);
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  removeStorage(key) {
    this.storage.remove(key);
  }


  getAll() {
    return this.http.get<IUser[]>(this.url + '/user');
  }

  getOne(data: Number) {
    return this.http.get<IUser>(this.url + '/user/' + data);
  }

  postAdd(data: IUser) {
    return this.http.post<IUser>(this.url + '/user', data);
  }

  putEdit(data: IUser) {
    return this.http.put<IUser>(this.url + '/user/' + data.id, data);
  }

  deleteOne(data: IUser) {
    return this.http.delete<IUser>(this.url + '/user/' + data.id);
  }


  getLogin(data: IUser) {

    // Pendente: essas funções e a comparação deve ser feita no WebService
    if ((data.username === 'devesa-0') && (data.pw === '123')) {

      this.userData = data;
      this.userAuth = true;
      this.showMenuEmitter.emit(true);

      // Set Storage
      this.setStorage('user', data);
      // Redirect
      this.router.navigate(['/'], {queryParams: {'ref': '.getLogin.UserService'}});
      return true;

    } else {

      // console.log('else');
      this.userAuth = false;
      this.showMenuEmitter.emit(false);
      return false;

    }
  }

  checkAuth() {

    console.log('checkAuth.userService');

    if (this.userAuth === undefined) {
      this.userAuth = false;
    }

    // Check Storage
    if (this.userAuth === false) {
      console.log('Buscando Storage');

      // check storage e compara chave de autenticação com webServer(Pendente)
      this.getStorage('user').then(
        resStorage => {
          // Compara com BD e redireciona pra '/perfil/:idUser' se houver algo em Storage
          if (resStorage) {
            this.userData = resStorage;
            this.getOne(resStorage.id).subscribe(
              res => {
                console.log('Buscando DB e comparando DADOS');
                if (!this.userAuth) {
                  this.userAuth = true;
                  this.showMenuEmitter.emit(true);
                }
              },
              error => {
                console.log('Erro em:' + error.message);
              },
              () => {
                console.log('Login OK...');
              });

          } else {
            console.log('Nada em storage');
            if (this.userAuth) {
              this.userData = null;
              this.userAuth = false;
              this.showMenuEmitter.emit(false);
            }
          }
        });
    } else {

      // Caso haja limpeza dos arquivos offline no navegado
      // Var userAuth === true, então verifica se existe algo em Storage,
      // se não existir USER em storage(limpou o navegador), então muda userAuth para false e redireciono pra /login
      // se existir user em storage(acesso de página redundante estando autenticado), tratado pelo metodo pageRedundant(goTo) na pagina

      this.getStorage('user').then(
        resStorage => {
          if (!resStorage) {
            console.log('Nada em storage, alterando userAuth');
            this.userData = null;
            this.userAuth = false;
            this.showMenuEmitter.emit(false);
            this.router.navigate(['/'], {queryParams: {'ref': 'checkAuth.UserService-2'}});
          }
        });

    }

    return this.userAuth;

  }

  pageRedundant() {

    // Caso user autenticado acesse diretamente(pela url) páginas redundantes(Login, Cadastro...), completa o Guard authOut

    if (this.userAuth) {
      this.getStorage('user').then(
        resStorage => {
          if (resStorage) {
            // goTo ? goTo = goTo : goTo = '/'; // Ir pra root evita travamentos
            console.log('Página redundante');
            //       // Caso user autenticado acesse diretamente(pela url) páginas redundantes(Login, Cadastro...), completa o Guard authOut
            this.router.navigate(['/'], {queryParams: {'ref': 'checkAuth.UserService-1'}});
          }
        });
    }

  }

}
