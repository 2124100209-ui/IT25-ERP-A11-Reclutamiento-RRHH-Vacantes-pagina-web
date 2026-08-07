import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {

  api = 'http://localhost:8000/api/skills';

  constructor(private http: HttpClient) {}

  obtenerSkills() {

    return this.http.get(this.api);

  }

  guardarSkill(skill: any) {

    return this.http.post(this.api, skill);

  }
}
