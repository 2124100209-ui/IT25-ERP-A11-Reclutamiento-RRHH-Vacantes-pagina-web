import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth';
import { UserAccountService } from '../services/user-account';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {

  correo = '';
  password = '';
  error = '';

  private readonly authService = inject(AdminAuthService);
  private readonly userAccountService = inject(UserAccountService);
  private readonly router = inject(Router);

  iniciarSesion() {
    this.error = '';

    this.authService
      .login(this.correo, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/administrador']);
        },
        error: () => {
          this.iniciarSesionUsuario();
        },
      });
  }

  iniciarSesionUsuario() {
    this.userAccountService
      .login(this.correo, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/usuario']);
        },
        error: () => {
          this.error = 'Correo o contrasena incorrectos.';
        },
      });
  }
}
