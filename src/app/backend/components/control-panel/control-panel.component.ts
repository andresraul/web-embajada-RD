import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private _auth: AuthService) { }

  ngOnInit() {
    const token = this._auth.getToken();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.userService.getUser(decodedToken.user._id)
    .subscribe((resp) => {
      console.log('ESTEEEE!!!', resp);
    }, (err) => {
      if ( err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
