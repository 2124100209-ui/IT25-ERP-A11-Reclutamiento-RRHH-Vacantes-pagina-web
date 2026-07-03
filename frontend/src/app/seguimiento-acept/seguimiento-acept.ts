import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SeguimientoService }
from '../services/seguimiento';

@Component({
  selector: 'app-seguimiento-acept',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguimiento-acept.html',
  styleUrl: './seguimiento-acept.css',
})
export class SeguimientoAcept {

  informacion: any[] = [];

  mostrarModal = false;
  mostrarContacto = false;

  participanteSeleccionado: any = null;

  private readonly seguimientoService =
    inject(SeguimientoService);

  private readonly changeDetector =
    inject(ChangeDetectorRef);

  private readonly router =
    inject(Router);


constructor() {
  afterNextRender(() => {
    this.obtenerAceptados();
  });
}

obtenerAceptados() {
  this.seguimientoService
    .obtenerPorEstado('aceptado')
    .subscribe((data: any) => {
      this.informacion = data;
      this.changeDetector.detectChanges();
    });
}

  abrirModal(participante: any) {

    this.participanteSeleccionado =
      participante;

    this.mostrarModal = true;

  }

  cerrarModal() {

    this.mostrarModal = false;

  }

  abrirContacto(participante: any) {

    this.participanteSeleccionado =
      participante;

    this.mostrarContacto = true;

  }

  cerrarContacto() {

    this.mostrarContacto = false;

  }

  eliminarParticipante(id: number) {

    const confirmar = confirm(
      '¿Eliminar postulante?'
    );

    if (!confirmar) return;

    this.seguimientoService
      .eliminarParticipante(id)
      .subscribe(() => {

        alert('Postulante eliminado');

        this.obtenerAceptados();

      });

  }


  cambiarEstado(
  id: number,
  status: string
) {
  this.seguimientoService
    .cambiarEstado(id, status)
    .subscribe(() => {
      this.obtenerAceptados();
    });
}

  contratarParticipante(id: number) {
    this.router.navigate(['/contratacion', id]);
  }

  descargarDocumento(
    participante: any,
    tipo: 'cv' | 'carta'
  ) {
    const tieneDocumento = tipo === 'cv'
      ? participante.cv_path
      : participante.carta_path;

    if (!tieneDocumento) {
      alert('Este postulante no tiene el documento cargado.');
      return;
    }

    this.seguimientoService
      .descargarDocumento(participante.id, tipo)
      .subscribe({
        next: (respuesta) => {
          const archivo = respuesta.body;

          if (!archivo) return;

          const url = window.URL.createObjectURL(archivo);
          const link = document.createElement('a');
          const nombre = tipo === 'cv'
            ? participante.cv_original_name
            : participante.carta_original_name;

          link.href = url;
          link.download = nombre || `${tipo}.pdf`;
          link.click();

          window.URL.revokeObjectURL(url);
        },
        error: () => {
          alert('No se pudo descargar el documento.');
        }
      });
  }
}
