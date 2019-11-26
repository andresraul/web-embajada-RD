import { Component, HostListener, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';

interface PhotoSet {
  id: string;
  title: string;
  description: string;
  photos: Array<IAlbum>;
}

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  showSpinner = false;
  page: number;
  perPage: number;
  photos: Array<IAlbum> = [];
  galleryPhotosets: Array<PhotoSet> = [];
  public defaultImage = './assets/img/placeholder.png';
  private subscription: Subscription;

  constructor(
    private galleryService: GalleryService,
    private lightbox: Lightbox,
    private lightboxEvent: LightboxEvent,
    private lighboxConfig: LightboxConfig,
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
    this.setTitle('Galería de Imágenes');
    this.page = 1;
    this.perPage = 4;
    this.getPhotos();
  }

  getPhotos() {
    this.showSpinner = true;
    this.galleryService
      .getPhotoSets(this.page, this.perPage)
      .subscribe(response => {
        const globalPhotosets = response.photosets.photoset;
        const allPhotosetsTemp = [];

        for (const value of globalPhotosets) {
          allPhotosetsTemp.push(value);
        }

        for (const value of allPhotosetsTemp) {
          const id = value.id;
          const title = value.title._content;
          const description = value.description._content;
          this.galleryService
            .getPhotos(value.id)
            .subscribe(photosFromPhotoset => {
              this.photos = [];
              for (const val of photosFromPhotoset.photoset.photo) {
                const photoUrl =
                  'https://farm' +
                  val.farm +
                  '.staticflickr.com/' +
                  val.server +
                  '/' +
                  val.id +
                  '_' +
                  val.secret +
                  '_b.jpg';
                this.photos.push({
                  src: photoUrl,
                  caption: title,
                  thumb: null
                });
              }

              this.galleryPhotosets.push({
                id,
                title,
                description,
                photos: this.photos
              });

              // this.sort();
            });
        }
      })
      .add(() => {
        this.delay(3000).then(() => {
          this.showSpinner = false;
        });
      });
  }

  open(photos: Array<IAlbum>, index: number): void {
    this.subscription = this.lightboxEvent.lightboxEvent$.subscribe(
      (event: IEvent) => this._onReceivedEvent(event)
    );

    this.lightbox.open(photos, index, {
      wrapAround: true,
      showImageNumberLabel: true,
      alwaysShowNavOnTouchDevices: true,
      albumLabel: 'Imagen %1 de %2'
    });
  }

  private _onReceivedEvent(event: IEvent): void {
    if (event.id === LIGHTBOX_EVENT.CLOSE) {
      this.subscription.unsubscribe();
    }
  }

  private setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onScroll() {
    this.page = this.page + 1;
    this.getPhotos();
  }
}
