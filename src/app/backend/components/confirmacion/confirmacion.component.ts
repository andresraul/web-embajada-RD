import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';





@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

token: string;

info: string;
errorMessage = 'Error 404';
successMessage: string;

formulario: FormGroup;

get password() {
  return this.formulario.get('password');
}

get password2() {
  return this.formulario.get('password2');
}


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private builder: FormBuilder,
              private userService: UserService) {
  this.formulario = this.builder.group({
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])],
    password2: ['']
  });

  this.formulario.controls.password2.setValidators([
    Validators.required,
    this.notEqual.bind(this)
  ]);

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.token = params.token;
    });
    const helper = new JwtHelperService();
    if (helper.isTokenExpired(this.token)) {
      this.errorMessage = null;
      this.info = 'El link ha expirado';
    } else {
    this.cleartextMessages();
    }

  }

  notEqual(control: FormControl): {[s: string]: boolean} {

    if (control.value !== this.formulario.controls.password.value) {
      return {noigual: true};
    }

    return null;

  }


  onSubmit(values) {
    this.cleartextMessages();
    this.userService.createPassword(this.token, values.password)
    .subscribe((data) => {
      this.formulario.reset();

      const helper = new JwtHelperService();
      const tokenInfo = helper.decodeToken(this.token);

      if (tokenInfo.user.validatedUser) {
        this.successMessage = 'Se guardado su nueva contraseña.';
      } else {
        this.successMessage = 'Se ha creado correctamente su contraseña.';
      }


    }, (err) => {
      this.formulario.reset();
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400) {
          return this.info = err.error.err.message ||
          'Error 400';
        }
        this.errorMessage = `Error ${err.status || 417}`;
      }
      this.errorMessage = 'Error de conección';
    });

  }

  cleartextMessages() {
    this.successMessage = null;
    this.info = null;
    this.errorMessage = null;
  }
}
