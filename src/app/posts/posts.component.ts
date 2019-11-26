import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/posts.service';
import { Post } from '../models/post';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  post$: Observable<Post>;
  postList: Post[];

  constructor(
    private route: ActivatedRoute,
    private service: PostService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.setTitle('Noticias');
    this.service.getPosts().subscribe(posts => (this.postList = posts));
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.service.getPost(params.get('slug')))
    );
  }

  viewPost(slug) {
    this.router.navigate(['noticias/' + slug]);
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
