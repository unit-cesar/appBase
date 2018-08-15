import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }, {
      title: 'Cadastro',
      url: '/cadastro',
      icon: 'at'
    }, {
      title: 'Perfil',
      url: '/perfil/0', //???????????????
      icon: 'at'
    }, {
      title: 'Login',
      url: '/login',
      icon: 'at'
    }, {
      title: 'Logoff',
      url: '/logoff',
      icon: 'at'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
