import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PostService } from '../../../../services/post.service';






@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postList: any;

  postsForm: FormGroup;

  constructor(private router: Router,
              private builder: FormBuilder,
              private authService: AuthService,
              public postService: PostService) { }

  ngOnInit() {

    const token = this.authService.getToken();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log('USER', decodedToken);

    this.postsForm = this.builder.group({
      category: ['']
    });
  
    if (decodedToken.user.access && decodedToken.user.access.length > 0) {

      this.postsForm.controls.category.setValue(decodedToken.user.access[0]);
      this.getPosts(decodedToken.user.access[0]);
    }

    this.postsForm.controls.category.valueChanges
    .subscribe((data) => {
      this.getPosts(data);
    });

  }

  crear() {
  this.router.navigate(['/panel-de-control/publicaciones/publicar/crear']);
  }

  getPosts(category) {
    this.postService.getPosts(category)
    .subscribe((data) => {
    this.postList = data;
    },
    (err) => {});

  }

}
