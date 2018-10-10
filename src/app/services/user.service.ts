import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { Storage } from '@ionic/storage';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Para o SQLite run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/user

  // Para SQLite
  // private readonly API: String = 'http://10.0.0.7:3000';

  // Para API
  private readonly API: String = 'http://127.0.0.1:8000/api';

  headers: any;
  userAuth: boolean;
  showMenuEmitter = new EventEmitter<boolean>();
  userData: IUser;

  constructor(public http: HttpClient, private storage: Storage, public router: Router) {
    console.log('Hello UserProvider Provider');

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

  setHeaders() {
    // Usado no Laravel
    if (this.userData.token) {
      this.headers = {'headers': {'authorization': 'Bearer ' + this.userData.token, 'X-Requested-With': 'XMLHttpRequest'}};
    }
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
    return this.http.get<IUser[]>(this.API + '/adm/users');
  }

  getOne(data: Number) {
    return this.http.get<IUser>(this.API + '/adm/users/' + data, this.headers);
  }

  postAdd(data: IUser) {
    return this.http.post<IUser>(this.API + '/adm/users', data);
  }

  putEdit(data: IUser) {
    return this.http.put<IUser>(this.API + '/adm/users/' + data.id, data);
  }

  deleteOne(data: IUser) {
    return this.http.delete<IUser>(this.API + '/adm/users/' + data.id);
  }


  getLogin(data: IUser) {
    // console.dir(data);
    return this.http.post<IUser>(this.API + '/login', data, this.headers);
  }

  login(data: IUser) {
    this.userData = data;
    this.userAuth = true;
    this.showMenuEmitter.emit(true);

    // Set Storage
    this.setStorage('user', data);

    // Set Headers
    this.setHeaders();

    // Redirect
    this.router.navigate(['/'], {queryParams: {'ref': '.getLogin.UserService'}});
  }

  checkAuth() {

    console.log('checkAuth.userService');

    if (this.userAuth === undefined) {
      this.userAuth = false;
    }

    // Check Storage
    if (this.userAuth === false) {
      console.log('Buscando Storage');

      this.getStorage('user').then(resStorage => {

        // Compara com BD e redireciona pra '/perfil/:idUser' se houver algo em Storage
        if (resStorage) {

          this.userData = resStorage;
          this.setHeaders(); // Set Headers e token com userData

          // Busca no webservice com token de storage para o webservice comparar se pertence ao mesmo user
          // @ts-ignore
          this.getOne(this.userData.id).subscribe((res: IUser) => {
              console.log('Buscando DB e comparando DADOS');
              // console.log(res.status);

              // Verifica resposta do webservice
              if (res.status === '202') {
                if (!this.userAuth) {
                  this.userAuth = true;
                  this.showMenuEmitter.emit(true);
                }
              } else {
                // User inválido - Remove do storage
                this.removeStorage('user');
                this.showMenuEmitter.emit(false);
                this.userAuth = false;
              }
            },
            error => {
              console.log('Erro em:' + error.message + '\n\nErro ao buscar dados de login no WebService\n\n');
              // Servidor off, implementar:
              // Manter user(que está no Storage) autenticado, marcar e informar como offline
              // User marcados como offline ao se conectarem deve chamar uma função de comparação
            },
            () => {
              // console.log('Login...');
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


  getLogout() {
    // console.dir(this.userData);
    return this.http.post(this.API + '/logout', this.userData, this.headers);
  }
  
}
