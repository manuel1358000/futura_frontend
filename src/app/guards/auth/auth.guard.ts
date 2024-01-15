import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../service/auth/auth.service';
import { AppState } from '../../state/app.state'; // Ajusta la importación según la ubicación real de tu estado de NgRx
import * as authSelectors from '../../state/selectors/'; // Ajusta la importación según la ubicación real de tus selectores de autenticación
import { map, take } from 'rxjs/operators';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = (route, state) => {
  // Inyecta el store y el servicio de autenticación
  const store = inject(Store);
  const authService = inject(AuthService);

  if (!store || !authService) {
    throw new Error('Store o AuthService no está disponible. Asegúrate de haberlo inyectado correctamente.');
  }

  const section = route.data['section'];

  // Utiliza el store para obtener el estado de autenticación
  return store.select(authSelectors.selectIsAuthenticated).pipe(
    take(1), // toma un valor y se desuscribe automáticamente
    map((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        return true; // Si el usuario está autenticado, permite la activación de la ruta
      } else {
        // Si el usuario no está autenticado, realiza acciones adicionales, como redirigir a la página de inicio de sesión
        console.log('Usuario no autenticado. Redirigiendo...');
        // router.navigate(['/login']); // Asegúrate de tener una instancia del Router disponible para utilizar navigate
        return false; // Evita la activación de la ruta
      }
    })
  );
};

export default authGuard;
