import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '../models/page';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient) {}

  // La Embajada
  private laEmbajadaUrl = 'assets/data/pages/1-la-embajada.json';

  // Sobre Dominicana
  private sobreDominicanaUrl = 'assets/data/pages/2-sobre-dominicana.json';

  // Relaciones con España
  private relacionesUrl = 'assets/data/pages/3-relaciones.json';

  // Comercio e Inversion
  private comercioUrl = 'assets/data/pages/4-comercio-e-inversion.json';

  // Cultura y Educacion
  private culturaUrl = 'assets/data/pages/5-cultura-y-educacion.json';

  // La Embajada
  getPagesEmbajada(): Observable<Page[]> {
    return this.http.get<Page[]>(this.laEmbajadaUrl);
  }

  getPageEmbajada(slug: string) {
    return this.getPagesEmbajada().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

  // Sobre Dominicana
  getPagesSobreDominicana(): Observable<Page[]> {
    return this.http.get<Page[]>(this.sobreDominicanaUrl);
  }

  getPageSobreDominicana(slug: string) {
    return this.getPagesSobreDominicana().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

  // Relaciones con España
  getPagesRelaciones(): Observable<Page[]> {
    return this.http.get<Page[]>(this.relacionesUrl);
  }

  getPageRelaciones(slug: string) {
    return this.getPagesRelaciones().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

  // Comercio e Inversión
  getPagesComercio(): Observable<Page[]> {
    return this.http.get<Page[]>(this.comercioUrl);
  }

  getPageComercio(slug: string) {
    return this.getPagesComercio().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

  // Cultura y Educación
  getPagesCultura(): Observable<Page[]> {
    return this.http.get<Page[]>(this.culturaUrl);
  }

  getPageCultura(slug: string) {
    return this.getPagesCultura().pipe(
      map(pages => pages.find(page => page.slug === slug))
    );
  }

}
