import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {path: 'detalhe', loadChildren: './detalhe/detalhe.module#DetalhePageModule'},
  {path: 'aula', loadChildren: './aula/aula.module#AulaPageModule'},
  {path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule'},
  {path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
  {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  {path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
