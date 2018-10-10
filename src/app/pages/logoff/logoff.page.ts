import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss'],
})
export class LogoffPage implements OnInit, OnDestroy {

  element: HTMLElement;
  inscBackButton: Subscription;
  fileName = 'src/app/pages/logoff/logoff.page.ts';
  inscLogout: Subscription;

  // res: IUser;

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
            this.getLogoutData();
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

  private getLogoutData() {

    // Remove de Storage
    this.userService.getStorage('user').then(resStorage => {
      if (resStorage) {

        // Remove do storage
        this.userService.removeStorage('user');
        this.userService.showMenuEmitter.emit(false);


        // Atualiza o BD e redireciona
        // (Pendente) Insere log em db
        // @ts-ignore
        this.inscLogout = this.userService.getLogout().subscribe((res: IUser) => {
          if (res.status === '200') {
            console.log('Logout ok em webservice');
          } else {
            console.log('Erro em logout no webservice');
          }
        }, error => {
          console.log('Erro em:' + error.message);
          // Servidor off, implementar:
          // Inserir log em storage para o user para possível registro na próxima sync de login
        }, () => {
          console.log('Logout OK');
          this.inscLogout.unsubscribe();
          this.router.navigate(['/home'], {queryParams: {'ref': this.router.url}});
        });

      } else {
        console.log('User não existe em Storage');
        this.router.navigate(['/login'], {queryParams: {'ref': this.router.url}});
      }
    });

  }
}
