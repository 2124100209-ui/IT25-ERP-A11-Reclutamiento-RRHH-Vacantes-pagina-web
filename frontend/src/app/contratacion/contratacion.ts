import { CommonModule } from '@angular/common';
import { afterNextRender, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contratacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contratacion.html',
  styleUrl: './contratacion.css',
})
export class Contratacion {

  private readonly route =
    inject(ActivatedRoute);

  private readonly router =
    inject(Router);

  private readonly http =
    inject(HttpClient);

  applicantId =
    this.route.snapshot.paramMap.get('id');

  contratacion = {
    id: this.applicantId || '',
    nombre: '',
    apellidoMaterno: '',
    apellidoPaterno: '',
  };

  familiares = [
    this.crearFamiliar()
  ];

  constructor() {
    afterNextRender(() => {
      this.cargarPostulante();
    });
  }

  crearFamiliar() {
    return {
      nombre: '',
      parentesco: '',
      edad: '',
      ocupacion: '',
      escolaridad: '',
      direccion: '',
      colonia: '',
      municipio: '',
      codigoPostal: '',
      telefono: '',
    };
  }

  agregarFamiliar() {
    this.familiares.push(
      this.crearFamiliar()
    );
  }

  eliminarFamiliar(index: number) {
    if (this.familiares.length === 1) {
      this.familiares[0] = this.crearFamiliar();
      return;
    }

    this.familiares.splice(index, 1);
  }

  trackByIndex(index: number) {
    return index;
  }

  cargarPostulante() {
    if (!this.applicantId) return;

    this.http.get<any>(
      `http://127.0.0.1:8000/api/applicants/${this.applicantId}`
    ).subscribe((postulante) => {
      const apellidos = this.separarApellidos(
        postulante.apellido || ''
      );

      this.contratacion.id = postulante.id || this.applicantId || '';
      this.contratacion.nombre = postulante.nombre || '';
      this.contratacion.apellidoPaterno =
        postulante.apellido_paterno || apellidos.paterno;
      this.contratacion.apellidoMaterno =
        postulante.apellido_materno || apellidos.materno;
    });
  }

  separarApellidos(apellidos: string) {
    const partes = apellidos
      .trim()
      .split(/\s+/)
      .filter((parte) => parte.length > 0);

    return {
      paterno: partes[0] || '',
      materno: partes.slice(1).join(' '),
    };
  }

  regresar() {
    this.router.navigate(['/seguimiento-acept']);
  }

}
