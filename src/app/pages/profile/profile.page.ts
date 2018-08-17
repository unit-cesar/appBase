import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: IUser;
  inscUserOne: Subscription;
  inscUserPut: Subscription;
  showPage: boolean;

  constructor(public router: Router, public userService: UserService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    this.showPage = false;
    this.user = this.userService.userData;
    this.showPage = this.userService.userAuth;


    // this.userService.getStorage('user').then(resStorage => {
    //   if (resStorage) {
    //
    //     // Pendente: Comparar se é igual ao ID da rota
    //
    //     // this.user = resStorage;
    //     this.inscUserOne = this.userService.getOne(resStorage.id).subscribe(
    //       res => {
    //         console.log(res);
    //         this.user = res;
    //       },
    //       error => {
    //         console.log('Erro em:' + error.message);
    //       },
    //       () => {
    //         this.goForm = true;
    //         this.inscUserOne.unsubscribe();
    //       }
    //     );
    //
    //   } else {
    //     console.log('"user" não existe em Storage');
    //     this.router.navigate(['/login'], {queryParams: {'ref': this.router.url}});
    //   }
    // });

  }

  putEditData(data: IUser) {
    // Primeiro no Servidor depois no Storage
    this.inscUserPut = this.userService.putEdit(data).subscribe(
      res => {
        this.userService.setStorage('user', res);
        console.log(res);
      },
      error => {
        console.log('Erro em:' + error.message);
      },
      () => {
        this.ionViewDidEnter(); // Reload
        this.inscUserPut.unsubscribe();
      });

  }

  cancelBack() {
    // this.router.navigate(['/'], {queryParams: {'ref': this.router.url}});
    this.router.navigate(['/', this.router.url]);
  }

}
