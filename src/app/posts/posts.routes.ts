import { PostComponent } from './post/post.component';
import { BlogComponent } from './blog/blog.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';

export const PostsRoutes: Routes = [
  { path: 'prensa/noticias', component: BlogComponent },
  { path: 'prensa/noticias/:slug', component: PostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PostsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
