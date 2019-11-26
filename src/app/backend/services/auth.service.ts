import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor() { }

getToken() {
  if (localStorage.getItem('token')){

    return localStorage.getItem('token');
  }
  if (sessionStorage.getItem('token')){

    return sessionStorage.getItem('token');
  }
}

public isAuthenticated(): boolean {
  const helper = new JwtHelperService();
  const token = this.getToken();
  return !helper.isTokenExpired(token);
}

}
