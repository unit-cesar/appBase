import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  fileName = 'src/app/pages/login/login.page.ts';
  user: IUser = {'id': 0, 'username': '', 'email': '', 'pw': ''};
  inscLogin: Subscription;
  goLogin = false;

  // Run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/cursos

  constructor(public userService: UserService, public router: Router) {

    // this.router.navigate(['/perfil]', {queryParams: {'ref': this.router.url}});

  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    // Verifica no Storage ou abre a tela de login
    this.userService.getStorage('user').then(resStorage => {
      if (resStorage) {
        // Compara com BD e redireciona pra '/perfil/:idUser'
        this.userService.getOne(resStorage.id).subscribe(
          res => {
            console.log(res);
            this.user = res; // ??? if/else...
          },
          error => {
            console.log('Erro em:' + error.message);
          },
          () => {
            console.log('Login OK');
            this.router.navigate(['/perfil/' + this.user.id], {queryParams: {'ref': this.router.url}});
          });

      } else {
        this.goLogin = true;
        console.log('Fazer login.');
      }
    });
  }

  getLoginData(data: IUser) {
    this.inscLogin = this.userService.getLogin(data).subscribe(
      res => {
        // Set Storage
        this.userService.setStorage('user', res);

        // Set user
        this.user = res;

        console.log(res);
      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
        alert('Erro ao fazer login!');
        this.router.navigate(['/'], {queryParams: {'ref': 'errorLogin'}});
      },
      () => {
        this.inscLogin.unsubscribe();
        this.router.navigate(['/perfil/' + this.user.id], {queryParams: {'ref': this.router.url}});
      });

  }


  cancelBack() {
    this.router.navigate(['/'], {queryParams: {'ref': this.router.url}});
  }
}
