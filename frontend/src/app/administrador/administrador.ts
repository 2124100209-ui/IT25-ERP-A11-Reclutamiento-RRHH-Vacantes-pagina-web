import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { HttpClient }
from '@angular/common/http';

import { AdminAuthService }
from '../services/admin-auth';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css',
})
export class Administrador {

  

  applicants: any[] = [];

  jobApplications: any[] = [];

  educations: any[] = [];

  workExperiences: any[] = [];

  skills: any[] = [];

  additionalInformation: any[] = [];

  admins: any[] = [];

  nuevoCorreo = '';
  nuevaPassword = '';
  mensajeAdmin = '';

  


  private readonly http =
    inject(HttpClient);

  private readonly adminAuthService =
    inject(AdminAuthService);

  private readonly changeDetector =
    inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this.actualizarTablas();
    });
  }

  actualizarTablas() {

    this.obtenerApplicants();

    this.obtenerJobApplications();

    this.obtenerEducations();

    this.obtenerWorkExperiences();

    this.obtenerSkills();

    this.obtenerAdditionalInformation();

    this.obtenerAdmins();

  }

  obtenerApplicants() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/applicants'
    ).subscribe(data => {

      console.log(data);

      this.applicants = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerJobApplications() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/job-applications'
    ).subscribe(data => {

      this.jobApplications = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerEducations() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/educations'
    ).subscribe(data => {

      this.educations = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerWorkExperiences() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/work-experiences'
    ).subscribe(data => {

      this.workExperiences = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerSkills() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/skills'
    ).subscribe(data => {

      this.skills = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerAdditionalInformation() {

    this.http.get<any[]>(
      'http://127.0.0.1:8000/api/additional-information'
    ).subscribe(data => {

      this.additionalInformation = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerAdmins() {

    this.adminAuthService
      .obtenerAdmins()
      .subscribe((data: any[]) => {
        this.admins = data;
        this.changeDetector.detectChanges();
      });

  }

  crearAdmin() {
    this.mensajeAdmin = '';

    this.adminAuthService
      .crearAdmin(this.nuevoCorreo, this.nuevaPassword)
      .subscribe({
        next: () => {
          this.mensajeAdmin = 'Administrador agregado correctamente.';
          this.nuevoCorreo = '';
          this.nuevaPassword = '';
          this.obtenerAdmins();
        },
        error: () => {
          this.mensajeAdmin = 'No se pudo agregar. Revisa el correo y la contrasena.';
        },
      });
  }

  eliminarPostulanteBaja(id: number) {
    const confirmar = confirm(
      'Eliminar definitivamente este postulante dado de baja?'
    );

    if (!confirmar) return;

    this.http.delete(
      `http://127.0.0.1:8000/api/seguimiento/${id}/definitivo`
    ).subscribe({
      next: () => {
        alert('Postulante eliminado definitivamente.');
        this.actualizarTablas();
      },
      error: () => {
        alert('Solo se pueden eliminar postulantes con status baja.');
      },
    });
  }

}
