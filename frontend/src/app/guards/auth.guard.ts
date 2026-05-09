import { Injectable, inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  
  // Revisar si existe un token en localStorage solo en el navegador
  const token = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
    ? window.localStorage.getItem('token')
    : null;
  
  if (token) {
    return true;
  }

  // Si no está autenticado, redirigir a login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
