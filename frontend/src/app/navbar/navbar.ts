import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { AdminAuthService } from '../services/admin-auth';
import { UserAccountService } from '../services/user-account';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  readonly authService = inject(AdminAuthService);
  readonly userAccountService = inject(UserAccountService);
  private readonly router = inject(Router);

  estaAutenticado() {
    return this.authService.estaAutenticado()
      || this.userAccountService.estaAutenticado();
  }

  esAdmin() {
    return this.authService.estaAutenticado();
  }

  cerrarSesion() {
    this.userAccountService.cerrarSesion();

    if (this.authService.estaAutenticado()) {
      this.authService.cerrarSesion();
      return;
    }

    this.router.navigate(['/admin-login']);
  }
}
