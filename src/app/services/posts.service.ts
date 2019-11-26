import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  private serviceUrl = 'assets/data/app-posts.json'; // Reemplazar por la url de la API

  /**
   * Obtiene todas los posts del documento app-posts.json
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.serviceUrl);
  }

  getPost(slug: string) {
    return this.getPosts().pipe(
      map(posts => posts.find(post => post.slug === slug))
    );
  }
}
