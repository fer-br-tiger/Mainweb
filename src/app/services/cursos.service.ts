import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const cudOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private urlBase = environment.url_servicios_base;

  private apiGetCursos = this.urlBase + '/cursos/';

  constructor(public http: HttpClient) { }

  getCursos(): Observable<any> {
    return this.http.get(this.apiGetCursos);
  }

  getCurso(id: number): Observable<any> {
    return this.http.get(this.apiGetCursos + id);
  }
}
