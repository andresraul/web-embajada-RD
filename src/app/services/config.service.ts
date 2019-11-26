import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _data: any;

  constructor(private http: HttpClient) {}

  private serviceUrl = 'assets/data/app-config.json'; // Reemplazar por la url de la API

  /**
   * Obtiene toda la información del documento app-config.json
   */
  public getData() {
    return new Promise((resolve, reject) => {
      this.http.get(this.serviceUrl).subscribe(
        data => {
          this._data = data;
          resolve(true);
        },
        error => {
          console.error('Error al obtener la configuración: ' + error);
          reject(true);
        }
      );
    });
  }

  /* Valores */

  get sitename() {
    return _.get(this._data, 'sitename');
  }

  get mobile_sitename() {
    return _.get(this._data, 'mobile_sitename');
  }

  get logo() {
    return _.get(this._data, 'logo');
  }

  get socialNetworks() {
    return _.get(this._data, 'social_networks');
  }

  get phone() {
    return _.get(this._data, 'phone');
  }

  get email() {
    return _.get(this._data, 'email');
  }

  get address() {
    return _.get(this._data, 'address');
  }
}
