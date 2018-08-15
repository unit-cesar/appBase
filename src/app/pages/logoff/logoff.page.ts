import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.page.html',
  styleUrls: ['./logoff.page.scss'],
})
export class LogoffPage implements OnInit {

  constructor(public router: Router, public userService: UserService) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // Verifica no Storage ou abre vai pra tela de login ou home
    this.userService.getStorage('user').then(resStorage => {
      if (resStorage) {

        // Remove do storage
        this.userService.removeStorage('user');

        // Atualiza o BD e redireciona
        this.userService.getOne(resStorage.id).subscribe(
          res => {
            console.log(res);
            // Insere log em db (Pendente)
          },
          error => {
            console.log('Erro em:' + error.message);
          },
          () => {
            console.log('Logoff OK');
            this.router.navigate(['/home'], {queryParams: {'ref': this.router.url}});
          });


      } else {
        console.log('User não existe em Storage');
        this.router.navigate(['/login'], {queryParams: {'ref': this.router.url}});
      }
    });
  }

}
