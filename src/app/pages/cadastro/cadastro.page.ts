import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/cadastro/cadastro.page.ts';
  user: IUser = {'username': 'devesa', 'email': 'user@user.com', 'pw': '123'};
  inscAdd: Subscription;
  showPage: boolean;
  inscBackButton: Subscription;
  element: HTMLElement;


  constructor(public userService: UserService, public router: Router, public platform: Platform) {
  }

  ngOnInit() {
    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Cadastro');
      // Check log in chrome: "chrome://inspect/#devices"

      this.element = document.getElementById('backButton') as HTMLElement;
      this.element.click();
      // OR
      // this.router.navigate(['/']);

    }, error => {
      console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
    });
  }

  ionViewDidEnter() {

    this.showPage = !this.userService.userAuth;

    // Força sair da página caso entre diretamente na URL (Complemento para 'authOutGuard')
    this.userService.pageRedundant();

  }

  postAddData(data: IUser) {
    this.inscAdd = this.userService.postAdd(data).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login'], {queryParams: {'ref': this.router.url}});
      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
        alert('Erro ao Cadastrar!');
        this.router.navigate(['/']);
      },
      () => {
        this.inscAdd.unsubscribe();
      });

  }

  ngOnDestroy() {
    this.inscBackButton.unsubscribe();
  }

  cancelBack() {
    this.router.navigate(['/'], {queryParams: {'ref': this.router.url}});
  }

}
