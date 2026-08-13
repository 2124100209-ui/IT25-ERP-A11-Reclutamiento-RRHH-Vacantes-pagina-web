import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {

  private readonly api = 'https://api-vacantes.i-deb.com.mx/api';
  private readonly storageKey = 'user_session';
  private readonly pendingFormKey = 'pending_user_form_data';
  private readonly rejectedVacanciesKey = 'rejected_user_vacancies';

  constructor(private http: HttpClient) {}

  crearCuenta(usuario: any) {
    return this.http
      .post<any>(`${this.api}/usuario`, usuario)
      .pipe(
        tap((respuesta) => {
          this.guardarSesion(respuesta);
        })
      );
  }

  login(correo: string, password: string) {
    return this.http
      .post<any>(`${this.api}/usuario-login`, {
        correo,
        password,
      })
      .pipe(
        tap((respuesta) => {
          this.guardarSesion(respuesta.usuario);
        })
      );
  }

  obtenerEstadoPostulacion(usuario: any) {
    return this.http.post<any>(
      `${this.api}/usuario/estado-postulacion`,
      {
        correo: usuario?.correo,
        curp: usuario?.curp,
      }
    );
  }

  obtenerUsuario() {
    if (typeof window === 'undefined') {
      return null;
    }

    const sesion = localStorage.getItem(this.storageKey);

    return sesion ? JSON.parse(sesion) : null;
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
    }
  }

  estaAutenticado() {
    return this.obtenerUsuario() !== null;
  }

  guardarDatosFormularioPendientes(datos: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.pendingFormKey, JSON.stringify(datos));
    }
  }

  obtenerDatosFormularioPendientes() {
    if (typeof window === 'undefined') {
      return null;
    }

    const datos = localStorage.getItem(this.pendingFormKey);

    return datos ? JSON.parse(datos) : null;
  }

  limpiarDatosFormularioPendientes() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.pendingFormKey);
    }
  }

  guardarVacanteNoAceptada(vacante: any) {
    if (typeof window === 'undefined' || !vacante?.id) {
      return;
    }

    const usuarioKey = this.obtenerClaveUsuario();

    if (!usuarioKey) {
      return;
    }

    const vacantesPorUsuario = this.obtenerVacantesNoAceptadasGuardadas();
    const vacantes = vacantesPorUsuario[usuarioKey] || {};

    vacantes[String(vacante.id)] = {
      id: vacante.id,
      puesto: vacante.puesto || 'esta vacante',
      mensaje: vacante.mensaje
        || `No se acepto tu solicitud en la vacante ${vacante.puesto || ''}.`,
    };

    vacantesPorUsuario[usuarioKey] = vacantes;

    localStorage.setItem(
      this.rejectedVacanciesKey,
      JSON.stringify(vacantesPorUsuario)
    );
  }

  obtenerVacantesNoAceptadas() {
    if (typeof window === 'undefined') {
      return {};
    }

    const usuarioKey = this.obtenerClaveUsuario();

    if (!usuarioKey) {
      return {};
    }

    const vacantesPorUsuario = this.obtenerVacantesNoAceptadasGuardadas();

    return vacantesPorUsuario[usuarioKey] || {};
  }

  obtenerVacanteNoAceptada(vacanteId: any) {
    if (!vacanteId) {
      return null;
    }

    const vacantes = this.obtenerVacantesNoAceptadas();

    return vacantes[String(vacanteId)] || null;
  }

  private obtenerVacantesNoAceptadasGuardadas() {
    const vacantes = localStorage.getItem(this.rejectedVacanciesKey);

    if (!vacantes) {
      return {};
    }

    try {
      return JSON.parse(vacantes);
    } catch {
      return {};
    }
  }

  private obtenerClaveUsuario() {
    const usuario = this.obtenerUsuario();
    const correo = String(usuario?.correo || '').trim().toLowerCase();
    const curp = String(usuario?.curp || '').trim().toUpperCase();

    if (correo) {
      return `correo:${correo}`;
    }

    if (curp) {
      return `curp:${curp}`;
    }

    return '';
  }

  private guardarSesion(usuario: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(usuario));
    }
  }
}
