import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-aside-control-panel',
  templateUrl: './aside-control-panel.component.html',
  styleUrls: ['./aside-control-panel.component.scss']
})
export class AsideControlPanelComponent implements OnInit {

  isAdmin = false;

  constructor(private _auth: AuthService) {
    const token = this._auth.getToken();
    const helper = new JwtHelperService();
    const role = helper.decodeToken(token).user.role;

    if (role === 'ADMIN_ROLE') {
      this.isAdmin = true;
    }

   }

  ngOnInit() {
  }

}
