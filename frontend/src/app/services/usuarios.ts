import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  api = 'https://api-vacantes.i-deb.com.mx/api/vacancy';

  constructor(private http: HttpClient) {}

  obtenerInformacion() {
    return this.http.get(this.api);
  }

  obtenerVacante(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

}
