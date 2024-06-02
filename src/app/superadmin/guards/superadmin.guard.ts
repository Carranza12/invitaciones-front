import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const superAdminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const user_string = localStorage.getItem('user');
  let user: any;

  if (user_string) {
    user = JSON.parse(user_string);
  }

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
        if (user.role !== 'superAdmin') {
          router.navigateByUrl('/' + user.role + '/home');
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.navigate(['/login']);
  return false;
};
