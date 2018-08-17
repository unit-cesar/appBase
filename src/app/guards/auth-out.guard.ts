import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthOutGuard implements CanActivate, CanLoad {

  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;

    if (this.userService.checkAuth()) {
      console.log('canActivate.authOutGuard - if');
      this.router.navigate(['/'], {queryParams: {'ref': 'canActivate.authOutGuard'}});
      return false;
    } else {
      console.log('canActivate.authOutGuard - else');
      return true;
    }
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad: verificando se usuário pode carregar o cod módulo');

    return false;
  }

}
