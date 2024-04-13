import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://ejy1yo74ve.execute-api.us-east-2.amazonaws.com/prod'; // Ajusta la URL según tu backend
  private tokenKey = 'jwt_token'; // Ajusta la clave según tu preferencia

  constructor(private http: HttpClient) { }

  login(credentials: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth`, credentials).pipe(
      catchError((error: any) => {
        // Handle errors here if needed
        return throwError(() => error);
      }),
      tap((response: any) => {
        console.log("response", response);

        if (response && response.statusCode) {
          if (response.statusCode === 401) {
            throw new Error(response.body);
          } else if (response.statusCode === 500) {
            throw new Error('Error interno del servidor. Por favor, inténtalo de nuevo más tarde.');
          }
          // Add more conditions as needed
        }

        console.log("response.body", response.body);

        // Verifica si response.body es una cadena y conviértela a objeto si es necesario
        let responseBody;
        if (typeof response.body === 'string') {
          try {
            responseBody = JSON.parse(response.body);
          } catch (error) {
            console.error('Error al parsear el cuerpo de la respuesta como JSON:', error);
          }
        } else {
          responseBody = response.body;
        }

        console.log("responseBody", responseBody);

        // Verifica si responseBody tiene la propiedad 'token'
        if (responseBody && responseBody.token) {
          console.log("ESTA AGREGADO TODO");
          this.storeToken(responseBody.token);
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
