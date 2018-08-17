import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthOutGuard } from './guards/auth-out.guard';

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
  {path: 'login', canActivate: [AuthOutGuard], loadChildren: './pages/login/login.module#LoginPageModule'},
  {path: 'cadastro', canActivate: [AuthOutGuard], loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule'},
  {path: 'perfil/:idUser', canActivate: [AuthGuard], loadChildren: './pages/profile/profile.module#ProfilePageModule'},
  {path: 'logoff', loadChildren: './pages/logoff/logoff.module#LogoffPageModule'},

];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],

  // + Posição do Scroll ao retornar
  // Em teoria deveria funcionar, mas deve ser preciso definir a
  // altura da página página em conteúdos dinâmicos
  imports: [RouterModule.forRoot(
    routes, {
      scrollPositionRestoration: 'enabled'
    },
  )],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
