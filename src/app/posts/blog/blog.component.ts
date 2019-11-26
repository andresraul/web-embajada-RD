import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/posts.service';
import { Post } from '../../models/post';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
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
