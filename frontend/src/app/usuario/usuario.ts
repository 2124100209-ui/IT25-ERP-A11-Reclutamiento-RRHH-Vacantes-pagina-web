import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { UsuariosService } from '../services/usuarios';

@Component({
  selector: 'app-usuario',
  imports: [RouterLink, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  private readonly changeDetector = inject(ChangeDetectorRef);

  mostrarModal = false;

  vacanteSeleccionada: any = null;

  abrirModal(vacante: any) {

  this.vacanteSeleccionada = vacante;

  this.mostrarModal = true;

}

  cerrarModal() {
    this.mostrarModal = false;
  }



  protected readonly title = signal('frontend');

  informacion : any[] = [];

  puesto = '';
  descripcion_breve = '';
  descripcion = '';
  horario = '';
  requisitos = '';
  salario = '';
  img = '';

  constructor(private UsuariosService: UsuariosService) {
    afterNextRender(() => {
      this.obtenerInformacion();
    });
  }

  obtenerInformacion() {

    this.UsuariosService.obtenerInformacion()
      .subscribe((data: any) => {

        console.log(data);

        this.informacion = data;
        this.changeDetector.detectChanges();

      });

  }

  separarRequisitos(requisitos: string) {
    return (requisitos || '')
      .split(/\r?\n|,/)
      .map((requisito) => requisito.trim())
      .filter((requisito) => requisito.length > 0);
  }

}
