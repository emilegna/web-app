import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ImagesService {

  constructor(private http: HttpClient) { }

  getInventarioImage(nombre: string): Observable<any> {
    if (!nombre) {
      return of(null);
    }
    return this.http.get(`${environment.apiBaseUrl}/imagenes/inventario/${nombre}`, {responseType: 'blob'});
  }

  blobToString(file: Blob): Promise<any> {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }

}
