import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NguCarouselConfig, NguCarouselStore } from '@ngu/carousel';
import 'hammerjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  carouselLoaded = false;
  carouselConfig: NguCarouselConfig;

  carouselItems = [
    {
      title: '<span class="usa-hero__heading--alt">Bienvenidos a</span>Embajada Dominicana en España',
      img: 'assets/img/slider5.jpg',
      alt: 'Embajada Dominicana No 1',
      caption: 'En este sitio web, el visitante encontrara un portal abierto hacia la Republica Dominicana',
      link: '#'
    },
    {
      title: '<span class="usa-hero__heading--alt">Bienvenidos a</span>Embajada Dominicana en España',
      img: 'assets/img/slider3.jpg',
      alt: 'Embajada Dominicana No 2',
      caption: 'En este sitio web, el visitante encontrara un portal abierto hacia la Republica Dominicana',
      link: '#'
    },
    {
      title: '<span class="usa-hero__heading--alt">Bienvenidos a</span>Embajada Dominicana en España',
      img: 'assets/img/slider1.jpg',
      alt: 'Embajada Dominicana No 3',
      caption: 'En este sitio web, el visitante encontrara un portal abierto hacia la Republica Dominicana',
      link: '#'
    },
    {
      title: '<span class="usa-hero__heading--alt">Bienvenidos a</span>Embajada Dominicana en España',
      img: 'assets/img/slider2.jpg',
      alt: 'Embajada Dominicana No 4',
      caption: 'En este sitio web, el visitante encontrara un portal abierto hacia la Republica Dominicana',
      link: '#'
    }
  ];
  constructor() {}

  ngOnInit() {
    this.carouselConfig = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 2,
      speed: 500,
      animation: 'lazy',
      interval: { timing: 5000, initialDelay: 1000 },
      point: { visible: true },
      load: 2,
      touch: true,
      loop: true,
      easing: 'ease',
      velocity: 0.2,
      custom: 'banner'
    };
  }
  /* It will be triggered on every slide */
  onmoveFn(data: NguCarouselStore) {}
}
