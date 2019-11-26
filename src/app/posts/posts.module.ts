// Módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// Configuración de Rutas
import { PostsRoutingModule } from './posts.routes';

// Componentes
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
import { BlogComponent } from './blog/blog.component';
// import { AsideComponent } from '../components/common/aside/aside.component';

@NgModule({
  declarations: [PostComponent, PostsComponent, BlogComponent],
  imports: [CommonModule, PostsRoutingModule, BrowserModule],
  exports: [],
  providers: []
})
export class PostsModule {}
