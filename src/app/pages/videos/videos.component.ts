import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoService, VideoResponse } from './../../services/videos.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  recentVideos: any[] = [];
  showSpinner = false;

  constructor(
    private youtubeService: VideoService,
    private titleService: Title
  ) {}

  async delay(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  ngOnInit() {
    this.setTitle('Videos');
    this.getVideoList();
  }

  getVideoList() {
    this.showSpinner = true;
    this.subscriptions.push(
      this.youtubeService
        .getVideos('UCl7379cd3Pv81tySqs0TR7A', 50)
        .subscribe((list: VideoResponse) => {
          for (const element of list.items) {
            this.recentVideos.push(element);
          }
        })
        .add(() => {
          this.delay(3000).then(() => {
            this.showSpinner = false;
          });
        })
    );
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
