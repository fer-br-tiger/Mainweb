import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {
  private apiLocalidades = 'https://apis.datos.gob.ar/georef/api/localidades?provincia=jujuy&departamento=San Pedro&max=20&campos=nombre';

  constructor(public http: HttpClient) { }

  getLocalidades(): Observable<any> {
    return this.http.get(this.apiLocalidades);
  }
}
