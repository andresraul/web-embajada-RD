// Módulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Galería de Imagenes
import { GalleryService } from '../services/gallery.service';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Configuración de Rutas
import { PagesRoutingModule } from './pages.routes';

// Componentes
import { HomeComponent } from './home/home.component';
import { ComercioComponent } from './comercio/comercio.component';
import { CulturaComponent } from './cultura/cultura.component';
import { EmbajadaComponent } from './laembajada/laembajada.component';
import { SobreDominicanaComponent } from './sobredominicana/sobredominicana.component';
import { RelacionesComponent } from './relaciones/relaciones.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { EventosComponent } from './eventos/eventos.component';
import { VideosComponent } from './videos/videos.component';
import { SingleVideoComponent } from './videos/video/video.component';

import { AsideComponent } from '../components/common/aside/aside.component';
import { ContactComponent } from '../components/contact/contact.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { SitemapComponent } from '../components/sitemap/sitemap.component';
import { SpinnerComponent } from './../components/common/spinner/spinner.component';

// Spinner
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';

// Gmaps
import { AgmCoreModule } from '@agm/core';
import { GmapsComponent } from '../components/gmaps/gmaps.component';

// Carousel
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from '../components/carousel/carousel.component';

@NgModule({
  declarations: [
    HomeComponent,
    ComercioComponent,
    CulturaComponent,
    EmbajadaComponent,
    SobreDominicanaComponent,
    RelacionesComponent,
    GmapsComponent,
    CarouselComponent,
    AsideComponent,
    ContactComponent,
    NotfoundComponent,
    SitemapComponent,
    GaleriaComponent,
    SpinnerComponent,
    EventosComponent,
    VideosComponent,
    SingleVideoComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NguCarouselModule,
    BrowserModule,
    LightboxModule,
    HttpClientModule,
    HttpClientJsonpModule,
    LazyLoadImageModule,
    HalfCircleSpinnerModule,
    InfiniteScrollModule,
    AgmCoreModule.forRoot({
      apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
    })
  ],
  exports: [],
  providers: [GalleryService]
})
export class PagesModule {}
