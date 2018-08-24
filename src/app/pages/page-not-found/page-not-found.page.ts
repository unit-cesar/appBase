import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.page.html',
  styleUrls: ['./page-not-found.page.scss'],
})
export class PageNotFoundPage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/aula/aula.page.ts';
  inscBackButton: Subscription;
  element: HTMLElement;

  constructor(public platform: Platform, router: Router) {
    //  Criar um log para análises futuras
  }

  ngOnInit() {
    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - PageNotFound');
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

}
