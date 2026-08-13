import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { HttpClient }
from '@angular/common/http';

import { AdminAuthService }
from '../services/admin-auth';
import { MoneyFormatPipe } from '../shared/money-format';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule, FormsModule, MoneyFormatPipe],
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

  mostrarPassword = false;

  editandoAdmin = false;
  adminEditandoId: number | null = null;


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
      'https://api-vacantes.i-deb.com.mx/api/applicants'
    ).subscribe(data => {

      console.log(data);

      this.applicants = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerJobApplications() {

    this.http.get<any[]>(
      'https://api-vacantes.i-deb.com.mx/api/job-applications'
    ).subscribe(data => {

      this.jobApplications = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerEducations() {

    this.http.get<any[]>(
      'https://api-vacantes.i-deb.com.mx/api/educations'
    ).subscribe(data => {

      this.educations = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerWorkExperiences() {

    this.http.get<any[]>(
      'https://api-vacantes.i-deb.com.mx/api/work-experiences'
    ).subscribe(data => {

      this.workExperiences = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerSkills() {

    this.http.get<any[]>(
      'https://api-vacantes.i-deb.com.mx/api/skills'
    ).subscribe(data => {

      this.skills = data;
      this.changeDetector.detectChanges();

    });

  }

  obtenerAdditionalInformation() {

    this.http.get<any[]>(
      'https://api-vacantes.i-deb.com.mx/api/additional-information'
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

  // MODO EDITAR
  if (this.editandoAdmin && this.adminEditandoId !== null) {

    this.adminAuthService
      .editarAdmin(
        this.adminEditandoId,
        this.nuevoCorreo,
        this.nuevaPassword
      )
      .subscribe({
        next: (respuesta: any) => {
          this.mensajeAdmin = respuesta.message;

          this.cancelarEdicion();
          this.obtenerAdmins();
        },

        error: (error) => {
          this.mensajeAdmin =
            error.error?.message ||
            'No se pudo actualizar el administrador.';
        }
      });

    return;
  }

  // MODO CREAR
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
        this.mensajeAdmin =
          'No se pudo agregar. Revisa el correo y la contrasena.';
      },
    });
}

  eliminarAdmin(id: number) {
  this.adminAuthService.eliminarAdmin(id).subscribe({
    next: () => {
      this.mensajeAdmin = 'Administrador eliminado correctamente.';
      this.obtenerAdmins();
    },
    error: (error) => {
      this.mensajeAdmin =
        error.error?.message || 'No se pudo eliminar el administrador.';
    }
  });
}

  eliminarPostulanteBaja(id: number) {
    const confirmar = confirm(
      'Eliminar definitivamente este postulante dado de baja?'
    );

    if (!confirmar) return;

    this.http.delete(
      `https://api-vacantes.i-deb.com.mx/api/seguimiento/${id}/definitivo`
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

  
  toggleActivoAdmin(id: number) {
  this.mensajeAdmin = '';

  this.adminAuthService.toggleActivoAdmin(id).subscribe({
    next: (respuesta: any) => {
      this.mensajeAdmin = respuesta.message;
      this.obtenerAdmins();
    },
    error: (error) => {
      this.mensajeAdmin =
        error.error?.message ||
        'No se pudo cambiar el estado del administrador.';
    }
  });
}


editarAdmin(admin: any) {
  this.editandoAdmin = true;
  this.adminEditandoId = admin.id;

  this.nuevoCorreo = admin.correo;
  this.nuevaPassword = '';

  this.mostrarPassword = false;

  this.mensajeAdmin = 'Editando administrador...';
}

cancelarEdicion() {
  this.editandoAdmin = false;
  this.adminEditandoId = null;

  this.nuevoCorreo = '';
  this.nuevaPassword = '';

  this.mostrarPassword = false;
  this.mensajeAdmin = '';
}
}
