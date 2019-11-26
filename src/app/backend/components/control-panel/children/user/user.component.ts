import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { String } from '../../../../../interfaces/gallery.interface';






@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  successStatus: string;
  errorConnection: string;
  errorMessage: string;

  invalidExtension = false;

newUserForm: FormGroup;

  selectedFile = null;

  paramNew: boolean;
  textButton: string;

  get name() {
    return this.newUserForm.get('name');
  }

  get lastname() {
    return this.newUserForm.get('lastname');
  }

  get email() {
    return this.newUserForm.get('email');
  }


  /* get image() {
    return this.newUserForm.get('img');
  } */

  constructor(private builder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {

      this.activatedRoute.params
      .subscribe((params) => {
        const from = params.from;
        if(from === 'nuevo') {
          this.paramNew = true;
          this.textButton = 'Crear nuevo usuario';
        } else {
          this.textButton = 'Modificar usuario';
        }
      });

      // tslint:disable-next-line:max-line-length
      const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      this.newUserForm = this.builder.group({
      name: ['', Validators.compose([
        Validators.required,
        this.emptyField
      ])],
      lastname: ['', Validators.compose([
        Validators.required,
        this.emptyField
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(emailPattern),
        this.emptyField
      ])],
      noticias: [],
      eventos: [],
      role: ['USER_ROLE', Validators.required],
      img: ['']
    });


 
   }

  ngOnInit() {
  }

  onFileSelected(event) {
    const arrayExtension = event.srcElement.files[0].type.split('/');
    const extension = arrayExtension[arrayExtension.length - 1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    if (validExtensions.indexOf(extension) < 0) {
      this.invalidExtension = true;
    } else {
      this.invalidExtension = false;
    }
    return this.selectedFile = event.srcElement.files[0];

  }

  createUser(user: User) {

      this.resertMessages();

      let access: any[] = [];

      if (user.noticias || user.eventos) {

      if (user.noticias) {
        access.push('NOTICIAS');
      }

      if (user.eventos) {
        access.push('EVENTOS');
      }

    }

      const usuario = new User(
      user.name,
      user.lastname,
      user.email
      );
      usuario.role = user.role;
      usuario.access = access;

      this.userService.createUser(usuario)
    .subscribe((res: any) => {

      if (!res.ok) {
      this.errorMessage = res.err.message;
      return;
      }

      if (this.selectedFile) {
        console.log('PASA');
        this.userService.uploadImage(res.user._id, this.selectedFile)
    .subscribe((data) => {
      this.successStatus = `El usuario ${user.email} fue creado correctamente.`;
      this.clearForm();
    },
    (err) => {
      this.userService.removeUser(res.user._id, 'true')
      .subscribe((resp) => {
        this.errorConnection = err.error.err.messaje || 'Error de conección: el usuario no pudo ser creado.';
      }, (err) => {
        this.errorMessage = `El usuario ${user.email} se ha creado, pero la imagen de perfil no se ha logrado subir.`;
      });

    });
      } else {
        this.successStatus = `El usuario ${user.email} fue creado correctamente.`;
        this.clearForm();
      }

    },
    (err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 400 || err.status === 500) {
       return this.errorMessage = err.error.err.errors.email.message ||
       err.message;
        }
      }

      this.errorConnection = `Error ${err.status || 417}`;

    });

  }

  clearForm() {
    this.newUserForm.reset();
    this.newUserForm.get('role').setValue('USER_ROLE');

  }

  resertMessages() {
    this.errorMessage = null;
    this.errorConnection = null;
    this.successStatus = null;
  }

  emptyField(control: FormControl): {[s: string]: boolean} {
    let space = control.value;
    if (control.value) {
      space = control.value.trim().length;
    }
    if (space === 0) {
  return {vacio: true};
  } else {
    return null;
  }

  }

}
