import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { UsuariosService } from '../services/usuarios';
import { UserAccountService } from '../services/user-account';
import { ApplicantsService } from '../services/applicants';
import { JobApplicationsService } from '../services/job-applications';
import { MoneyFormatPipe } from '../shared/money-format';

@Component({
  selector: 'app-usuario',
  imports: [RouterLink, CommonModule, MoneyFormatPipe],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly userAccountService =
    inject(UserAccountService);

  mostrarModal = false;
  mostrarNotificacionSegundoFiltro = false;
  mensajeSegundoFiltro = '';
  vacantesNoAceptadas: Record<string, any> = {};

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

  constructor(
    private UsuariosService: UsuariosService,
    private applicantsService: ApplicantsService,
    private jobApplicationsService: JobApplicationsService
  ) {
    afterNextRender(() => {
      this.cargarVacantesNoAceptadas();
      this.obtenerInformacion();
      this.cargarVacantesDadasDeBaja();
      this.revisarSegundoFiltro();
    });
  }

  cargarVacantesNoAceptadas() {
    this.vacantesNoAceptadas =
      this.userAccountService.obtenerVacantesNoAceptadas();
  }

  cargarVacantesDadasDeBaja() {
    const usuario = this.userAccountService.obtenerUsuario();

    if (!usuario) return;

    forkJoin({
      applicants: this.applicantsService.obtenerApplicants(),
      postulaciones: this.jobApplicationsService.obtenerJobApplications(),
    }).subscribe({
      next: ({ applicants, postulaciones }: any) => {
        const postulante = (applicants || []).find((applicant: any) => {
          const mismoCorreo = applicant.email
            && usuario.correo
            && applicant.email === usuario.correo;
          const mismaCurp = applicant.curp
            && usuario.curp
            && applicant.curp === usuario.curp;

          return (mismoCorreo || mismaCurp)
            && String(applicant.status || '').toLowerCase() === 'baja';
        });

        if (!postulante) return;

        (postulaciones || [])
          .filter((postulacion: any) =>
            postulacion.applicant_id === postulante.id
            && postulacion.vacancy_id
          )
          .forEach((postulacion: any) => {
            const mensaje = `No se acepto tu solicitud en la vacante ${postulacion.puesto_aplicado || 'seleccionada'}.`;

            this.userAccountService.guardarVacanteNoAceptada({
              id: postulacion.vacancy_id,
              puesto: postulacion.puesto_aplicado,
              mensaje,
            });
          });

        this.cargarVacantesNoAceptadas();
        this.changeDetector.detectChanges();
      },
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

  revisarSegundoFiltro() {
    const usuario = this.userAccountService.obtenerUsuario();

    if (!usuario) return;

    this.userAccountService
      .obtenerEstadoPostulacion(usuario)
      .subscribe({
        next: (respuesta) => {
          if (!respuesta?.segundo_filtro) return;

          const puesto = respuesta.postulacion?.puesto_aplicado;

          this.mensajeSegundoFiltro = puesto
            ? `Tu postulacion para ${puesto} avanzo al segundo filtro.`
            : 'Tu postulacion avanzo al segundo filtro.';

          this.mostrarNotificacionSegundoFiltro = true;
          this.changeDetector.detectChanges();
        },
      });
  }

  obtenerMensajeNoAceptada(vacante: any) {
    const registro = this.vacantesNoAceptadas[String(vacante?.id)];

    if (!registro) return '';

    return registro.mensaje
      || `No se acepto tu solicitud en la vacante ${vacante?.puesto}.`;
  }

  vacanteNoAceptada(vacante: any) {
    return Boolean(this.obtenerMensajeNoAceptada(vacante));
  }

}
