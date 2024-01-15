import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../service/auth/auth.service';
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = (route, state) => {
  // Inyecta el store y el servicio de autenticación
  const authService = inject(AuthService);

  if (!authService) {
    throw new Error('Store o AuthService no está disponible. Asegúrate de haberlo inyectado correctamente.');
  }

  const section = route.data['section'];

  // Utiliza el store para obtener el estado de autenticación
  return authService.isAuthenticated();
};

export default authGuard;
