import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { 
    Router,
    CanActivate,
    ActivatedRouteSnapshot
  } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService,
              public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
   const expectedRole = route.data.expectedRole;
   const token = this.auth.getToken();
   const helper = new JwtHelperService();
   const tokenPayload = helper.decodeToken(token);

   if (tokenPayload.user.role !== expectedRole) {
       this.router.navigate(['/panel-de-control/publicaciones']);
       return false;
   }
   return true;
  }

}