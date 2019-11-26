import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { VideoService, VideoResponse } from './../../../services/videos.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class SingleVideoComponent implements OnInit {

  videoUrl: SafeResourceUrl;
  subscriptions: Subscription[] = [];
  currentVideo: any[] = [];
  id: string;

  constructor(private activatedRoute: ActivatedRoute,
              private youtubeService: VideoService,
              private domSanitizer: DomSanitizer,
              private router: Router ) { }

  ngOnInit() {

    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });

    this.subscriptions.push(
      this.youtubeService
        .getVideoById(this.id)
        .subscribe((list: VideoResponse) => {
          for (const element of list.items) {
            this.currentVideo.push(element);
          }
        })
    );

    this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.id);

  }
}
