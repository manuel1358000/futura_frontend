import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { User } from '../../../../models/users/user.model';
import { UserResponse } from '../../../../models/users/userResponse.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      // Aquí defines los campos del formulario y sus validadores si los tienes
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.signinForm.valid) {
      const credentials: User = this.signinForm.value;
      this.authService.login(credentials)
        .subscribe({
          next: (response: UserResponse) => {
            console.log("RESPONSE",response);
          },
          error: (error: any)=>{
            console.log("ocurrio un error",error);
          }
        });
    }
  }
}
