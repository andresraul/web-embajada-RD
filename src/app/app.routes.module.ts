import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const ROUTES: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'mapa-del-sitio', component: SitemapComponent },
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  exports: [RouterModule]
})
export class RoutesModule {}
