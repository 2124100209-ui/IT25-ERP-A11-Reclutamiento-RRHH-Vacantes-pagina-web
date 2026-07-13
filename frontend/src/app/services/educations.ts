import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EducationsService {

  api = 'https://api-vacantes.i-deb.com.mx/api/educations';

  constructor(private http: HttpClient) {}

  obtenerEducations() {

    return this.http.get(this.api);

  }

  guardarEducation(educations: any) {

    return this.http.post(this.api, educations);

  }

}