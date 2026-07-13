import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationsService {
  
  api = 'https://api-vacantes.i-deb.com.mx/api/job-applications';

  constructor(private http: HttpClient) {}

  obtenerJobApplications() {

    return this.http.get(this.api);

  }

  guardarJobApplication(jobApplication: any) {

    return this.http.post(this.api, jobApplication);

  }
}
