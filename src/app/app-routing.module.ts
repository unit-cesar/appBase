import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  {path: 'detalhe', loadChildren: './pages/detalhe/detalhe.module#DetalhePageModule'},
  {path: 'detalhe/:id', loadChildren: './pages/detalhe/detalhe.module#DetalhePageModule'},
  {path: 'aula/:idCurso/:idAula', loadChildren: './pages/aula/aula.module#AulaPageModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  {path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
  {path: 'perfil/:idUser', loadChildren: './pages/profile/profile.module#ProfilePageModule'},
  {path: 'logoff', loadChildren: './pages/logoff/logoff.module#LogoffPageModule'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
