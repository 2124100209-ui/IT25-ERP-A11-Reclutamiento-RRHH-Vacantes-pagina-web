import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {

  private readonly api = 'http://localhost:8000/api';
  private readonly storageKey = 'admin_session';
  private readonly tokenKey = 'admin_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(correo: string, password: string) {
    return this.http
      .post<any>(`${this.api}/admin-login`, {
        correo,
        password,
      })
      .pipe(
        tap((respuesta) => {
          this.guardarSesion(respuesta.admin, respuesta.token);
        })
      );
  }

  obtenerAdmins() {
    return this.http.get<any[]>(`${this.api}/admin-users`);
  }

  crearAdmin(correo: string, password: string) {
    return this.http.post<any>(`${this.api}/admin-users`, {
      correo,
      password,
    });
  }

  eliminarAdmin(id: number) {
  return this.http.delete(`${this.api}/admin-users/${id}`);
}

  estaAutenticado() {
    return this.obtenerAdmin() !== null && this.obtenerToken() !== null;
  }

  obtenerAdmin() {
    if (typeof window === 'undefined') {
      return null;
    }

    const sesion = localStorage.getItem(this.storageKey);

    return sesion ? JSON.parse(sesion) : null;
  }

  cerrarSesion() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.tokenKey);
    }

    this.router.navigate(['/admin-login']);
  }

  obtenerToken() {
    if (typeof window === 'undefined') {
      return null;
    }

    return localStorage.getItem(this.tokenKey);
  }

  private guardarSesion(admin: any, token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(admin));
      localStorage.setItem(this.tokenKey, token);
    }
  }
}
