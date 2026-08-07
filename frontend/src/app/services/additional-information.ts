import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdditionalInformationService {

  api = 'http://localhost:8000/api/additional-information';

  constructor(private http: HttpClient) {}

  obtenerInformacion() {

    return this.http.get(this.api);

  }

  guardarInformacion(info: any) {

    return this.http.post(this.api, info);

  }

}
