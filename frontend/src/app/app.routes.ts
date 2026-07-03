import { Routes } from '@angular/router';
import { Usuario } from './usuario/usuario';
import { Formulario } from './formulario/formulario';
import { Seguimiento } from './seguimiento/seguimiento'; 
import { Administrador } from './administrador/administrador';
import { Vacantes } from './vacantes/vacantes'; 
import { SeguimientoAcept } from './seguimiento-acept/seguimiento-acept';
import { AdminLogin } from './admin-login/admin-login';
import { adminAuthGuard } from './services/admin-auth.guard';
import { Contratacion } from './contratacion/contratacion';
import { UsuarioRegistro } from './usuario-registro/usuario-registro';

export const routes: Routes = [
  { path: '', component: Usuario },
  { path: 'usuario', component: Usuario },
  { path: 'form', component: Formulario },
  { path: 'admin-login', component: AdminLogin },
  { path: 'crear-cuenta', component: UsuarioRegistro },
  {
    path: 'seguimiento',
    component: Seguimiento,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'seguimiento-acept',
    component: SeguimientoAcept,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'contratacion/:id',
    component: Contratacion,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'administrador',
    component: Administrador,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'vacantes',
    component: Vacantes,
    canActivate: [adminAuthGuard],
  }
];
