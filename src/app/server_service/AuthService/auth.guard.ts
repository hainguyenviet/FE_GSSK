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
  canActivate() {
    if (this.auth.isLoggedIn()) {
      return true
    }
    this.route.navigateByUrl('/login')
    return false;
  }
  
}
