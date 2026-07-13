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

  private guardarSesion(usuario: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(usuario));
    }
  }
}
