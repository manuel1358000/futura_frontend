import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { User } from '../../../../models/users/user.model';
import { UserResponse } from '../../../../models/users/userResponse.model';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      // Aquí defines los campos del formulario y sus validadores si los tienes
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    if (this.signinForm.valid) {
      this.isLoading = true; // Activar el indicador de carga
      const credentials: User = this.signinForm.value;

      this.authService.login(credentials).subscribe({
        next: (response: UserResponse) => {
          console.log("response",response);
          this.router.navigate(['/ad-administrator/administration']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.';
          } else if (error.status === 500) {
            this.errorMessage = 'Error interno del servidor. Por favor, inténtalo de nuevo más tarde.';
          } else {
            this.errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.';
          }
          console.log("ocurrio un error", error);
        },
        complete: () => {
          this.isLoading = false; // Desactivar el indicador de carga cuando la solicitud se completa
        }
      });
    }
  }
}
