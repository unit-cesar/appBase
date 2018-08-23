import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/profile/profile.page.ts';
  user: IUser;
  inscUserOne: Subscription;
  inscUserPut: Subscription;
  showPage: boolean;
  inscBackButton: Subscription;
  element: HTMLElement;

  constructor(public router: Router, public userService: UserService, public platform: Platform) {
  }

  ngOnInit() {
    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Profile');
      // Check log in chrome: "chrome://inspect/#devices"

      this.element = document.getElementById('backButton') as HTMLElement;
      this.element.click();
      // OR
      // this.router.navigate(['/']);

    }, error => {
      console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
    });
  }

  ngOnDestroy() {
    this.inscBackButton.unsubscribe();
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
