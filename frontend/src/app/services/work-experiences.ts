import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkExperiencesService {

  api = 'https://api-vacantes.i-deb.com.mx/api/work-experiences';

  constructor(private http: HttpClient) {}

  obtenerWorkExperiences() {

    return this.http.get(this.api);

  }

  guardarWorkExperience(workExperience: any) {

    return this.http.post(this.api, workExperience);

  }

}
