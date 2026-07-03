import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VacancyService {

  api = 'http://127.0.0.1:8000/api/vacancy-admin';

  constructor(private http: HttpClient) {}


  obtenerInformacion() {

    return this.http.get(this.api);

  }

  obtenerVacantes() {

    return this.http.get(this.api);

  }

  guardarVacante(vacante: any) {

    return this.http.post(this.api, vacante);

  }

  actualizarVacante(
    id: number,
    vacante: any
  ){
    return this.http.post(
      `${this.api}/${id}`,
      vacante
    );
}

  eliminarVacante(id: number) {

    return this.http.delete(
      `${this.api}/${id}`,
    );

  }

cambiarEstado(id: number) {

  return this.http.put(
    `${this.api}/${id}/estado`,
    {}
  );

}

  
}
