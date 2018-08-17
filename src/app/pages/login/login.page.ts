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

  // Run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/cursos

  // Var for test
  user: IUser = {'id': 0, 'username': 'devesa-0', 'email': 'user0@user.com', 'pw': '123'};

  showPage: boolean;

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    // Mostra página apenas para user autenticado
    this.showPage = !this.userService.userAuth;

    // Força sair da página caso entre diretamente na URL (Complemento para 'authOutGuard')
    this.userService.pageRedundant();

  }

  getLoginData(data: IUser) {
    if (!this.userService.getLogin(data)) {
      console.log('Usuário ou senha inválido!');
      alert('Usuário ou senha inválido!');
    }
  }

  cancelBack() {
    this.router.navigate(['/'], {queryParams: {'ref': this.router.url}});
  }

}
