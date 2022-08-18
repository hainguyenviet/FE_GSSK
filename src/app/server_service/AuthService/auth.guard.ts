import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {
    
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.auth.isLoggedIn()) {

    //   return true
    // }
    // this.route.navigateByUrl('/login')
    // return false;
    return this.checkUserLogin(next)
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.isLoggedIn()) {
      const userRole = localStorage.getItem('ROLE')
      if (route.data.role && route.data.role.indexOf(userRole) === -1){
        this.route.navigateByUrl('/login')
        return false;
      }
      return true;
    }
    this.route.navigateByUrl('/login');
    return false;
  }
  
}
