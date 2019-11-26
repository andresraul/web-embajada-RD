import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  goToResetPwd = false;
  emailLabel = 'Tu correo electrónico';
  headerText = 'Iniciar sesión';
  submitButton = 'Entrar';

  public formulario: FormGroup;

 successMessage: string;
 errorMessage: string;
 errorConnection: string;

 get email() {
   return this.formulario.get('email');
 }

 get password() {
  return this.formulario.get('password');
}

  constructor(private loginService: LoginService,
              private router: Router,
              private _auth: AuthService,
              private builder: FormBuilder,
              private userService: UserService) {

    // tslint:disable-next-line:max-line-length
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formulario = this.builder.group({
    email: ['', Validators
      .compose([
        Validators.required,
        Validators.pattern(emailPattern)
      ])
    ],
    password: ['', Validators.required],
    keep: ['']
  });

   }

  ngOnInit() {
    const token = this._auth.getToken();
    if (token) {
      this.loginService.redirectToControlPanel(token);
    }
  }

  login(values) {
    this.clearMessages();

    const email = values.email;
    const password = values.password;
    const checkbox = values.keep;

    if (!this.formulario.valid) {
    return;
    }

    this.loginService.login(email, password).subscribe((res: any) => {
      if (res.ok) {
        if (checkbox) {

          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
        this.router.navigate(['panel-de-control']);

      }

    }, (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 400 && err.status !== 500) {
       return this.errorConnection = `Error ${err.status || 417}`;
        }
      }

      this.errorMessage = err.error.err.message ||
      err.err.errors.email.message ||
      err.err.errors.password.message;
    });

  }

  goToReset() {
    this.clearMessages();
    this.formulario.reset();
    this.goToResetPwd = true;
    this.headerText = 'Obtener contraseña';
    this.emailLabel = 'Correo electrónico asociado a tu cuenta:';
    this.submitButton = 'Confirmar cambio de contraseña';
  }

  return() {
    this.clearMessages();
    this.formulario.reset();
    this.goToResetPwd = false;
    this.headerText = 'Iniciar sesión';
    this.emailLabel = 'Tu correo electrónico';
    this.submitButton = 'Entrar';
  }

  resetPwd(values) {
  this.clearMessages();

  this.userService.resetPassword(values.email)
  .subscribe((data: any) => {

    this.formulario.reset();
    this.successMessage = data.message;

  }, (err) => {
    this.formulario.reset();
    if (err instanceof HttpErrorResponse) {
      if (err.status === 400) {
        return this.errorMessage = err.error.err.message ||
        'Error 400';
      }
      this.errorConnection = `Error ${err.status || 417}`;
    }
    this.errorConnection = 'Error de conección';
  });
  }

  clearMessages() {
    this.successMessage = null;
    this.errorMessage = null;
    this.errorConnection = null;
  }

}
