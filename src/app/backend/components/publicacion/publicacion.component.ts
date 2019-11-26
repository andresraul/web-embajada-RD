import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent implements OnInit {

  id: any;
  postData: any;
  userInfo: any;

  constructor(private activatedRoute: ActivatedRoute,
              public postService: PostService,
              public userService: UserService) {
                this.activatedRoute.params
                .subscribe((params) => {
                  this.id = params.id;
                });
               }

  ngOnInit() {
    this.postService.getPostById(this.id)
    .subscribe((data: any) => {
      console.log(data);
      this.postData = data;
      this.userService.getUser(data.author)
      .subscribe((user: any) => {
      this.userInfo = user.user;
      });
    });
  }

  editar() {}

}
