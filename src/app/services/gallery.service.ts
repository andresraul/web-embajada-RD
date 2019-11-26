import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Response, PhotoSetByIds } from '../interfaces/gallery.interface';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient, private jsonp: HttpClientJsonpModule) {}
  userId = 'xxxxxxx';
  apiKey = 'xxxxxxxxxxx';

  getPhotoSets(page: number, perPage: number) {
    return this.http.jsonp<Response>(
      'https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=' +
        this.apiKey +
        '&user_id=' +
        this.userId +
        '&page=' +
        page +
        '&per_page=' +
        perPage +
        '&format=json&extras=date_taken',
      'jsoncallback'
    );
  }

  getPhotos(photosetId: any) {
    return this.http.jsonp<PhotoSetByIds>(
      'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' +
        this.apiKey +
        '&photoset_id=' +
        photosetId +
        '&user_id=' +
        this.userId +
        '&format=json&extras=date_taken',
      'jsoncallback'
    );
  }
}
