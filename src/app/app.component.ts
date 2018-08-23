import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  private showMenu: boolean;
  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    console.log('ngOnInit.APP.COMPONENT');

    if (this.showMenu === undefined) {
      this.showMenu = false;
    }

    this.guardRefreshMenu();
    this.userService.showMenuEmitter.subscribe(res => {
      this.showMenu = res;
      this.guardRefreshMenu();
    }, error => {
      console.log('Erro em:' + error.message);
    });

  }

  guardRefreshMenu() {
    this.appPages = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home',
        guard: true,
        routerDirection: 'root'
      }, {
        title: 'Cadastro',
        url: '/cadastro',
        icon: 'at',
        guard: !this.showMenu,
        routerDirection: 'forward'
      }, {
        title: 'Perfil',
        url: '/perfil/0', // ???????????????
        icon: 'at',
        guard: this.showMenu,
        routerDirection: 'forward'
      }, {
        title: 'Login',
        url: '/login',
        icon: 'at',
        guard: !this.showMenu,
        routerDirection: 'forward'
      }, {
        title: 'Logoff',
        url: '/logoff',
        icon: 'at',
        guard: this.showMenu,
        routerDirection: 'forward'
      }];
  }

}
