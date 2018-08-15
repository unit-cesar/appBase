import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/cadastro/cadastro.page.ts';
  user: IUser = {'username': 'devesa', 'email': 'user@user.com', 'pw': '123'};
  inscAdd: Subscription;

  constructor(public userService: UserService, public router: Router) {
  }

  ngOnInit() {
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
  }

  cancelBack() {
    this.router.navigate(['/'], {queryParams: {'ref': this.router.url}});
  }

}
