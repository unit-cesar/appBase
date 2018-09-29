import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss'],
})
export class LogoffPage implements OnInit, OnDestroy {

  element: HTMLElement;
  inscBackButton: Subscription;
  fileName = 'src/app/pages/logoff/logoff.page.ts';

  constructor(public router: Router, public userService: UserService, public alertController: AlertController, public platform: Platform) {
  }

  ngOnInit() {

    this.presentAlertConfirm();

    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Login');
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
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Logoff',
      message: 'Tem certeza que deseja <strong>sair</strong>?',
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.cancel();
          }
        }, {
          text: 'Sair',
          handler: () => {
            this.userService.logoff();
          }
        }
      ]
    });

    await alert.present();
  }

  cancel() {
    this.element = document.getElementById('backButton') as HTMLElement;
    this.element.click();
  }


}
