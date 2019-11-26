import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/posts.service';
import { Post } from '../../models/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post$: Observable<Post>;
  postList: Post[];


  constructor(private route: ActivatedRoute, private service: PostService) {}

  ngOnInit() {
    this.service.getPosts().subscribe(posts => (this.postList = posts));
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getPost(params.get('slug')))
    );
  }
}
