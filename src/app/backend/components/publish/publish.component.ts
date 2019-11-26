import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { QuillService } from '../../services/quillService.service';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';







@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  accessNoticias: boolean;
  accessEventos: boolean;

  errorMessage: any;

  formPost: FormGroup;

  selectedFile: any;

  invalidExtension = false;

  editorStyle = {
    height: '400px'
  };
  config: any;
  postButton: string;
  placehold = 'Escriba su texto aquí...';

  constructor(public formBuilder: FormBuilder, 
              public quillService: QuillService,
              public postService: PostService,
              private authService: AuthService,
              private router: Router) {

                const token = this.authService.getToken();
                const helper = new JwtHelperService();

                const decodedToken = helper.decodeToken(token);
                

                if (decodedToken.user.access.indexOf('NOTICIAS') >= 0) {
                  this.accessNoticias = true;
                }

                if (decodedToken.user.access.indexOf('EVENTOS') >= 0) {
                  this.accessEventos = true;
                }


                this.config = this.quillService.config;
                this.postButton = 'Crear post';
   }

  ngOnInit() {
    this.formPost = this.formBuilder.group({
      category: ['', Validators.required],
      img: ['', Validators.required],
      title: ['', Validators.compose([
        Validators.required,
        this.emptyField
      ])],
      desc: ['', Validators.compose([
        Validators.required,
        this.emptyField
      ])],
      body: ['', Validators.compose([
        Validators.required,
        this.emptyHtmlField
      ])]
                  });
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

  onSubmit(values: Post) {

    this.errorMessage = null;

    let post = new Post(
      values.category,
      values.title,
      values.desc,
      values.body
    );

    this.postService.createPost(post)
    .subscribe((data: any) => {

      if (!data.ok) {
        this.errorMessage = 'Error al enviar la publicación.';
        return;
        }

      this.formPost.reset();

      if(this.selectedFile) {
      const id = data.data._id;
      this.postService.updateImagePost(id, this.selectedFile)
      .subscribe((data: any) => {
        if (!data.ok) {
          this.errorMessage = 'Error al enviar la publicación.';
          return;
          }
        this.router.navigate(['panel-de-control', 'publicaciones', 'publicacion', id]);
      },
      (err) => {
        this.postService.removePost(data.data._id)
        .subscribe((resp) => {
          this.errorMessage = 'Error al enviar la publicación.';
        }, (err) => {});
        console.log(err);
      });

      } else {

      this.router.navigate(['panel-de-control', 'publicaciones', 'publicacion', data.data._id]);
      }

    },
   (err) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 400) {
        return this.errorMessage = err.error.err.message;
      }
      console.log(err);
    }

   });


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

  emptyHtmlField(control: FormControl): {[s: string]: boolean} {
    let space = control.value;
    if (control.value) {
      space = control.value.replace(/<[^>]*>?/gm, '').trim().length;
    }
    if (space === 0) {
  return {vacio: true};
  } else {
    return null;
  }

  }

}
