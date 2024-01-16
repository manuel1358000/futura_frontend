import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://tu-backend-api/auth'; // Ajusta la URL según tu backend
  private tokenKey = ''; // Ajusta la clave según tu preferencia
  private refreshTokenKey = 'refreshToken'; // Clave para el token de actualización

  constructor(private http: HttpClient) {}

  login(credentials: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeToken(response.token);
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No hay un token de actualización disponible.');
    }

    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeToken(response.token);
        }
      }),
      catchError((error) => {
        // Manejar errores de renovación de token aquí
        // Por ejemplo, redirigir al usuario a la página de inicio de sesión
        this.logout();
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.removeRefreshToken();
    // Limpia cualquier otro dato de sesión que puedas almacenar
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    return true;
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }
}
