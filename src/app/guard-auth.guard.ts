import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const guardAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  if (route.data['admin'] && !authService.isAdmin()) {
    return router.createUrlTree(['/game']);
  }

  return true;};
