import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { EmbajadaComponent } from './laembajada/laembajada.component';
import { SobreDominicanaComponent } from './sobredominicana/sobredominicana.component';
import { RelacionesComponent } from './relaciones/relaciones.component';
import { CulturaComponent } from './cultura/cultura.component';
import { ComercioComponent } from './comercio/comercio.component';
import { EventosComponent } from './eventos/eventos.component';
import { VideosComponent } from './videos/videos.component';
import { SingleVideoComponent } from './videos/video/video.component';

export const PagesRoutes: Routes = [
  { path: 'prensa/imagenes', component: GaleriaComponent },
  { path: 'prensa/eventos', component: EventosComponent },
  { path: 'prensa/videos', component: VideosComponent },
  { path: 'prensa/videos/:id', component: SingleVideoComponent },
  { path: 'la-embajada/:slug', component: EmbajadaComponent },
  { path: 'sobre-dominicana/:slug', component: SobreDominicanaComponent },
  { path: 'relaciones-con-espana/:slug', component: RelacionesComponent },
  { path: 'cultura-y-educacion/:slug', component: CulturaComponent },
  { path: 'comercio-e-inversion/:slug', component: ComercioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(PagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
