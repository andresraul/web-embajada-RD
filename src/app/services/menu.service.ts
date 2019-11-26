import { Menu } from './../models/menu';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  private serviceUrl = 'assets/data/app-menu.json'; // Reemplazar por la url de la API

  // Manejo de de errores en API
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Manejando errores del lado del servidor
      console.error('Un error ha ocurrido:', error.error.message);
    } else {
      console.error(
        `El backend ha devuelto el siguiente código ${error.status}, ` + `el cuerpo del mensaje es: ${error.error}`
      );
    }
    return throwError('Ha ocurrido un error, intente de nuevo :(');
  }

  // Obtengo items del menu de navegación
  getMenuItems(): Observable<Menu> {
    return this.http.get<Menu>(this.serviceUrl).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
