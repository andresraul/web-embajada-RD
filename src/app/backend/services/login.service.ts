import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';





@Injectable({
    providedIn: 'root'
  })
  export class LoginService {

constructor(private http: HttpClient,
            private router: Router) {}

    public login(email, password) {
        const url = `${environment.apiUrl}/login`;
        console.log('URL!!!', url);
        const body = {
            email,
            password
        };
        return this.http.post(url, body);
    }

    redirectToControlPanel(token) {
      const helper = new JwtHelperService();
      const expiredToken = helper.isTokenExpired(token);
      if (!expiredToken) {
        this.router.navigate(['/panel-de-control']);
      } else {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }


  }