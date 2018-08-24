import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './components/test/test.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { CursosService } from './services/cursos.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthOutGuard } from './guards/auth-out.guard';
import { LoginPageModule } from './pages/login/login.module';
import { CadastroPageModule } from './pages/cadastro/cadastro.module';

@NgModule({
  declarations: [AppComponent, TestComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    CadastroPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CursosService,
    UserService,
    AuthGuard,
    AuthOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
