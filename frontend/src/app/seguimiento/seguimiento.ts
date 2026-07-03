import { afterNextRender, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguimientoService }
from '../services/seguimiento';

@Component({
  selector: 'app-seguimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export class Seguimiento {

  informacion: any[] = [];
  historialBajas: any[] = [];

  mostrarModal = false;
  mostrarContacto = false;
  mostrarHistorial = false;

  participanteSeleccionado: any = null;
  bajaSeleccionada: any = null;

  private readonly seguimientoService =
    inject(SeguimientoService);

  private readonly changeDetector =
    inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this.obtenerInformacion();
      this.obtenerHistorialBajas();
    });
  }

  obtenerInformacion() {
    this.seguimientoService
      .obtenerInformacion()
      .subscribe((data: any) => {
        this.informacion = data;
        this.changeDetector.detectChanges();
      });
  }

  obtenerHistorialBajas() {
    this.seguimientoService
      .obtenerHistorialBajas()
      .subscribe((data: any) => {
        this.historialBajas = data;
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

  abrirHistorial(baja: any) {
    this.bajaSeleccionada = baja;
    this.mostrarHistorial = true;
  }

  cerrarHistorial() {
    this.mostrarHistorial = false;
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

        this.obtenerInformacion();
        this.obtenerHistorialBajas();
      });
  }

  cambiarEstado(
    id: number,
    status: string
  ) {
    this.seguimientoService
      .cambiarEstado(id, status)
      .subscribe(() => {
        if (status === 'aceptado') {
          alert('Participante aprobado');
        }

        this.obtenerInformacion();
      });
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
