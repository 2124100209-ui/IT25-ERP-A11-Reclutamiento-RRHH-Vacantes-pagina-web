import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);

  if (typeof window === 'undefined') {
    return true;
  }

  if (authService.estaAutenticado()) {
    return true;
  }

  return router.createUrlTree(['/admin-login']);
};
