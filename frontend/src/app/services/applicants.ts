import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {

  api = 'http://127.0.0.1:8000/api/applicants';

  constructor(private http: HttpClient) {}

  obtenerApplicants() {

    return this.http.get(this.api);

  }

  guardarAplicante(applicants: any) {

    return this.http.post(this.api, applicants);

  }

}