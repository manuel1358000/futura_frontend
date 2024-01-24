import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://p94gioahu8.execute-api.us-east-2.amazonaws.com/Dev'; // Ajusta la URL según tu backend
  private tokenKey = 'jwt_token'; // Ajusta la clave según tu preferencia

  constructor(private http: HttpClient) {}

  login(credentials: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, credentials).pipe(
      catchError((error: any) => {
        // Handle errors here if needed
        return throwError(() => error);
      }),
      tap((response: any) => {

        if (response && response.statusCode) {
          if (response.statusCode === 401) {
            throw new Error(response.body);
          } else if (response.statusCode === 500) {
            throw new Error('Error interno del servidor. Por favor, inténtalo de nuevo más tarde.');
          }
          // Add more conditions as needed
        }
  
        // Continue with your logic here
        if (response.body.token) {
          this.storeToken(response.body.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
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
}
