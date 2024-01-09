import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserResponse } from '../../models/users/userResponse.model';
import { User } from '../../models/users/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mock: boolean=true;

  constructor(private http: HttpClient) { }

  signIn(credentials: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('http://localhost:3000/login', credentials);
  }
  signUp(credentials: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('http://localhost:3000/register', credentials);
  }
}