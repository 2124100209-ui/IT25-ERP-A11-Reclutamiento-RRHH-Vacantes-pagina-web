import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AdditionalInformationService }
from '../services/additional-information';

import { ApplicantsService }
from '../services/applicants';

import { EducationsService }
from '../services/educations';

import { JobApplicationsService }
from '../services/job-applications';

import { WorkExperiencesService }
from '../services/work-experiences';

import { SkillsService }
from '../services/skills';

import { UsuariosService }
from '../services/usuarios';

import { UserAccountService }
from '../services/user-account';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {

  protected readonly title = signal('frontend');

  informacion: any[] = [];
  erroresFormulario: string[] = [];
  formSubmitted = false;

  nombre = '';
  apellido = '';
  email = '';
  telefono = '';
  curp = '';
  direccion = '';
  fecha_nacimiento = '';
  estado_civil = '';
  credito_infonavit = false;

  nivel_educativo = '';
  institucion = '';
  titulo_obtenido = '';

  puesto_aplicado = '';
  area = '';
  sueldo_percibido = '';

  tiempo_experiencia = '';
  trabaja_actualmente = false;
  sueldo_actual = '';

  habilidades_blandas = '';

  disponibilidad_horario = '';
  licencia_conducir = false;
  vehiculo_propio = false;
  discapacidad = false;

  tipo_de = '';
  otras_caracteristicas = '';

  cv: File | null = null;
  carta: File | null = null;

  cursos: string[] = [''];
  idiomas: string[] = [''];
  software: string[] = [''];
  habilidadesTecnicas: string[] = [''];

  experiencias = [
    {
      empresa: '',
      puesto: '',
      periodo: '',
      responsabilidades: '',
      motivo_salida: '',
    }
  ];

  private readonly applicantsService =
    inject(ApplicantsService);

  private readonly educationsService =
    inject(EducationsService);

  private readonly jobApplicationsService =
    inject(JobApplicationsService);

  private readonly additionalService =
    inject(AdditionalInformationService);

  private readonly workExperiencesService =
    inject(WorkExperiencesService);

  private readonly skillsService =
    inject(SkillsService);

  private readonly router =
    inject(Router);

  private readonly route =
    inject(ActivatedRoute);

  private readonly usuariosService =
    inject(UsuariosService);

  private readonly userAccountService =
    inject(UserAccountService);

  private readonly changeDetector =
    inject(ChangeDetectorRef);

  constructor() {
    afterNextRender(() => {
      this.cargarDatosUsuario();
      this.obtenerInformacion();
      this.cargarVacanteSeleccionada();
    });
  }

  cargarDatosUsuario() {
    const usuario = this.userAccountService.obtenerUsuario();

    if (!usuario) return;

    if (usuario.datos_formulario) {
      this.aplicarDatosFormulario(usuario.datos_formulario);
    }

    this.nombre = usuario.nombre || '';
    this.apellido = usuario.apellido || '';
    this.email = usuario.correo || '';
    this.telefono = usuario.telefono || '';
    this.curp = usuario.curp || '';
    this.direccion = usuario.direccion || '';
    this.fecha_nacimiento = usuario.fecha_nacimiento || '';
  }

  aplicarDatosFormulario(datos: any) {
    this.nombre = datos.nombre || this.nombre;
    this.apellido = datos.apellido || this.apellido;
    this.email = datos.email || this.email;
    this.telefono = datos.telefono || this.telefono;
    this.curp = datos.curp || this.curp;
    this.direccion = datos.direccion || this.direccion;
    this.fecha_nacimiento = datos.fecha_nacimiento || this.fecha_nacimiento;
    this.estado_civil = datos.estado_civil || this.estado_civil;
    this.credito_infonavit = Boolean(datos.credito_infonavit);
    this.nivel_educativo = datos.nivel_educativo || '';
    this.institucion = datos.institucion || '';
    this.titulo_obtenido = datos.titulo_obtenido || '';
    this.sueldo_percibido = datos.sueldo_percibido || '';
    this.tiempo_experiencia = datos.tiempo_experiencia || '';
    this.trabaja_actualmente = Boolean(datos.trabaja_actualmente);
    this.sueldo_actual = datos.sueldo_actual || '';
    this.habilidades_blandas = datos.habilidades_blandas || '';
    this.disponibilidad_horario = datos.disponibilidad_horario || '';
    this.licencia_conducir = Boolean(datos.licencia_conducir);
    this.vehiculo_propio = Boolean(datos.vehiculo_propio);
    this.discapacidad = Boolean(datos.discapacidad);
    this.tipo_de = datos.tipo_de || '';
    this.otras_caracteristicas = datos.otras_caracteristicas || '';
    this.cursos = datos.cursos?.length ? datos.cursos : [''];
    this.idiomas = datos.idiomas?.length ? datos.idiomas : [''];
    this.software = datos.software?.length ? datos.software : [''];
    this.habilidadesTecnicas = datos.habilidadesTecnicas?.length
      ? datos.habilidadesTecnicas
      : [''];
    this.experiencias = datos.experiencias?.length
      ? datos.experiencias
      : this.experiencias;
  }

  agregarCurso() {
    this.cursos.push('');
  }

  eliminarCurso(index: number) {
    this.cursos.splice(index, 1);
  }

  agregarIdioma() {
    this.idiomas.push('');
  }

  eliminarIdioma(index: number) {
    this.idiomas.splice(index, 1);
  }

  agregarSoftware() {
    this.software.push('');
  }

  eliminarSoftware(index: number) {
    this.software.splice(index, 1);
  }

  agregarHabilidadTecnica() {
    this.habilidadesTecnicas.push('');
  }

  eliminarHabilidadTecnica(index: number) {
    this.habilidadesTecnicas.splice(index, 1);
  }

  agregarExperiencia() {
    this.experiencias.push({
      empresa: '',
      puesto: '',
      periodo: '',
      responsabilidades: '',
      motivo_salida: '',
    });
  }

  eliminarExperiencia(index: number) {
    this.experiencias.splice(index, 1);
  }

  obtenerInformacion() {
    this.additionalService.obtenerInformacion()
      .subscribe((data: any) => {
        this.informacion = data;
        this.changeDetector.detectChanges();
      });
  }

  cargarVacanteSeleccionada() {
    const vacanteId = Number(
      this.route.snapshot.queryParamMap.get('vacanteId')
    );

    if (!vacanteId) return;

    this.usuariosService
      .obtenerVacante(vacanteId)
      .subscribe((vacante: any) => {
        this.puesto_aplicado = vacante.puesto || '';
        this.area = vacante.departamento || '';
        this.changeDetector.detectChanges();
      });
  }

  seleccionarArchivo(event: Event, tipo: 'cv' | 'carta') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    if (tipo === 'cv') {
      this.cv = file;
    } else {
      this.carta = file;
    }
  }

  guardarFormulario(
    formulario?: any,
    cvFiles?: FileList | null,
    cartaFiles?: FileList | null
  ) {
    this.formSubmitted = true;
    this.erroresFormulario = this.obtenerErroresFormulario(formulario);

    if (this.erroresFormulario.length > 0) {
      setTimeout(() => {
        document
          .querySelector('.form-errors')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      });

      return;
    }

    if (!this.userAccountService.estaAutenticado()) {
      const crearCuenta = confirm(
        'No has iniciado sesion. Quieres crear una cuenta para guardar tus datos y usarlos en futuras postulaciones?'
      );

      if (crearCuenta) {
        this.userAccountService
          .guardarDatosFormularioPendientes(this.obtenerDatosFormulario());

        this.router.navigate(['/crear-cuenta'], {
          queryParams: {
            desdeFormulario: '1',
          },
        });

        return;
      }
    }

    const cvSeleccionado = cvFiles?.[0] ?? this.cv;
    const cartaSeleccionada = cartaFiles?.[0] ?? this.carta;

    const applicants = new FormData();

    applicants.append('nombre', this.nombre);
    applicants.append('apellido', this.apellido);
    applicants.append('curp', this.curp);
    applicants.append('email', this.email);
    applicants.append('telefono', this.telefono);
    applicants.append('direccion', this.direccion);
    applicants.append('fecha_nacimiento', this.fecha_nacimiento);
    applicants.append('estado_civil', this.estado_civil);
    applicants.append(
      'credito_infonavit',
      this.credito_infonavit ? '1' : '0'
    );

    if (cvSeleccionado) {
      applicants.append(
        'cv',
        cvSeleccionado,
        cvSeleccionado.name
      );
    }

    if (cartaSeleccionada) {
      applicants.append(
        'carta',
        cartaSeleccionada,
        cartaSeleccionada.name
      );
    }

    this.applicantsService
      .guardarAplicante(applicants)
      .pipe(
        switchMap((respuesta: any) => {
          const applicantId = respuesta.id;

          const educations = {
            applicant_id: applicantId,
            nivel_educativo: this.nivel_educativo,
            institucion: this.institucion,
            titulo_obtenido: this.titulo_obtenido,
            cursos: this.cursos.join(', ')
          };

          const jobApplication = {
            applicant_id: applicantId,
            puesto_aplicado: this.puesto_aplicado,
            area: this.area,
            sueldo_percibido: this.sueldo_percibido
          };

          const workExperiences = this.experiencias.map((exp) => {
            return {
              applicant_id: applicantId,
              tiempo_experiencia: this.tiempo_experiencia,
              empresa: exp.empresa,
              puesto: exp.puesto,
              periodo: exp.periodo,
              responsabilidades: exp.responsabilidades,
              motivo_salida: exp.motivo_salida,
              trabaja_actualmente: this.trabaja_actualmente,
              sueldo_actual: this.sueldo_actual
            };
          });

          const skill = {
            applicant_id: applicantId,
            idiomas: this.idiomas.join(', '),
            software: this.software.join(', '),
            habilidades_tecnicas:
              this.habilidadesTecnicas.join(', '),
            habilidades_blandas:
              this.habilidades_blandas
          };

          const info = {
            applicant_id: applicantId,
            licencia_conducir: this.licencia_conducir,
            vehiculo_propio: this.vehiculo_propio,
            discapacidad: this.discapacidad,
            disponibilidad_horario: this.disponibilidad_horario,
            tipo_de: this.tipo_de,
            otras_caracteristicas: this.otras_caracteristicas
          };

          const solicitudes = [
            this.educationsService.guardarEducation(educations),
            this.jobApplicationsService.guardarJobApplication(jobApplication),
            this.skillsService.guardarSkill(skill),
            this.additionalService.guardarInformacion(info),
            ...workExperiences.map((workExperience) =>
              this.workExperiencesService
                .guardarWorkExperience(workExperience)
            )
          ];

          return forkJoin(solicitudes);
        })
      )
      .subscribe({
        next: () => {
          alert('Formulario enviado correctamente');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          this.erroresFormulario =
            this.obtenerErroresServidor(error);

          if (this.erroresFormulario.length === 0) {
            this.erroresFormulario = [
              'No se pudo guardar el formulario completo. Revisa los datos e intentalo otra vez.'
            ];
          }

          setTimeout(() => {
            document
              .querySelector('.form-errors')
              ?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
          });
        }
      });
  }

  obtenerErroresServidor(error: any) {
    const errores = error?.error?.errors;

    if (errores) {
      return Object.values(errores)
        .flat()
        .map((mensaje) => String(mensaje));
    }

    if (error?.error?.message) {
      return [String(error.error.message)];
    }

    return [];
  }

  obtenerErroresFormulario(formulario?: any) {
    const errores: string[] = [];

    const requeridos = [
      { valor: this.nombre, campo: 'Nombre(s)', seccion: 'Datos Personales' },
      { valor: this.apellido, campo: 'Apellidos', seccion: 'Datos Personales' },
      { valor: this.telefono, campo: 'Telefono', seccion: 'Datos Personales' },
      { valor: this.email, campo: 'Correo electronico', seccion: 'Datos Personales' },
      { valor: this.curp, campo: 'CURP', seccion: 'Datos Personales' },
      { valor: this.direccion, campo: 'Direccion', seccion: 'Datos Personales' },
      { valor: this.fecha_nacimiento, campo: 'Fecha de nacimiento y edad', seccion: 'Datos Personales' },
      { valor: this.estado_civil, campo: 'Estado civil', seccion: 'Datos Personales' },
      { valor: this.puesto_aplicado, campo: 'Nombre del puesto', seccion: 'Puesto Solicitado' },
      { valor: this.area, campo: 'Area / Departamento', seccion: 'Puesto Solicitado' },
      { valor: this.nivel_educativo, campo: 'Nivel de estudios', seccion: 'Educacion' },
      { valor: this.institucion, campo: 'Escuela', seccion: 'Educacion' },
      { valor: this.titulo_obtenido, campo: 'Carrera o especialidad', seccion: 'Educacion' },
      { valor: this.habilidades_blandas, campo: 'Habilidades blandas', seccion: 'Habilidades' },
    ];

    requeridos.forEach((item) => {
      if (this.campoVacio(item.valor)) {
        errores.push(`${item.seccion}: falta ${item.campo}.`);
      }
    });

    if (!this.campoVacio(this.email) && !this.correoValido(this.email)) {
      errores.push('Datos Personales: el correo electronico no tiene un formato valido.');
    }

    if (formulario?.invalid && errores.length === 0) {
      errores.push('Hay informacion incompleta o con formato incorrecto. Revisa los campos marcados.');
    }

    if (this.discapacidad && this.campoVacio(this.tipo_de)) {
      errores.push('Informacion Adicional: especifica el tipo de discapacidad.');
    }

    return errores;
  }

  campoVacio(valor: any) {
    return String(valor ?? '').trim().length === 0;
  }

  correoValido(correo: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  }

  obtenerDatosFormulario() {
    return {
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      curp: this.curp,
      direccion: this.direccion,
      fecha_nacimiento: this.fecha_nacimiento,
      estado_civil: this.estado_civil,
      credito_infonavit: this.credito_infonavit,
      nivel_educativo: this.nivel_educativo,
      institucion: this.institucion,
      titulo_obtenido: this.titulo_obtenido,
      puesto_aplicado: this.puesto_aplicado,
      area: this.area,
      sueldo_percibido: this.sueldo_percibido,
      tiempo_experiencia: this.tiempo_experiencia,
      trabaja_actualmente: this.trabaja_actualmente,
      sueldo_actual: this.sueldo_actual,
      habilidades_blandas: this.habilidades_blandas,
      disponibilidad_horario: this.disponibilidad_horario,
      licencia_conducir: this.licencia_conducir,
      vehiculo_propio: this.vehiculo_propio,
      discapacidad: this.discapacidad,
      tipo_de: this.tipo_de,
      otras_caracteristicas: this.otras_caracteristicas,
      cursos: this.cursos,
      idiomas: this.idiomas,
      software: this.software,
      habilidadesTecnicas: this.habilidadesTecnicas,
      experiencias: this.experiencias,
      vacanteId: this.route.snapshot.queryParamMap.get('vacanteId'),
    };
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

}
