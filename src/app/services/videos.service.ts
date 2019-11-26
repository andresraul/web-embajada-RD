import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // Clave API del canal de Youtube
  apiKey = 'xxxxxxxxxxx';

  constructor(private http: HttpClient, private jsonp: HttpClientJsonpModule) {}

  getVideos(channel: string, maxResults: number): Observable<object> {
    const url =
      'https://www.googleapis.com/youtube/v3/search?key=' +
      this.apiKey +
      '&channelId=' +
      channel +
      '&order=date&part=snippet&type=video,id&maxResults=' +
      maxResults;
    return this.http.jsonp(url, 'callback').pipe(
      map(res => {
        return res;
      })
    );
  }

  getVideoById(id: string): Observable<object> {
    const url =
      'https://www.googleapis.com/youtube/v3/videos?key=' +
      this.apiKey +
      '&part=snippet,contentDetails&id=' +
      id;
    return this.http.jsonp(url, 'callback').pipe(
      map(res => {
        return res;
      })
    );
  }
}

// Mover interfaz a archivo independiente
export interface VideoResponse {
  items: Array<object>;
}
