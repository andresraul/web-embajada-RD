import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';




@Injectable({
    providedIn: 'root'
  })
  export class PostService {

    url = environment.apiUrl;

    constructor(private http: HttpClient,
                private domSanitizer: DomSanitizer) {}

    createPost(body) {
        return this.http.post(`${this.url}/post`, body);
    }

    removePost(id){
        return this.http.delete(`${this.url}/post/${id}`);
    }

    updateImagePost(id, file){
    const postPhoto = new FormData();
    postPhoto.append('postPhoto', file);

    return this.http.put(`${this.url}/upload/post-img/${id}`, postPhoto);
    }

    getPostById(id) {
      return this.http.get(`${this.url}/post/${id}`)
      .pipe(map((data: any) => {
        if (data.ok) {

          const htmlText = this.domSanitizer.bypassSecurityTrustHtml(data.data.body);
          const datos = {
            created: data.data.created,
            category: data.data.category,
            author: data.data.author,
            title: data.data.title,
            desc: data.data.desc,
            body: htmlText,
            image: data.data.image
          }
          return datos;

        }
        return data;
      }));
    }

    getPosts(category) {
      return this.http.get(`${this.url}/post?category=${category}`)
      .pipe(map((data: any) => {
        if (data.ok) {
          return data.data;
        }
        return data;
      }));
    }


  }