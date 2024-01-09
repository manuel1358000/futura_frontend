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
  signupForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      // Aquí defines los campos del formulario y sus validadores si los tienes
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const credentials: User = this.signupForm.value;
      this.authService.signIn(credentials)
        .subscribe({
          next: (response: UserResponse) => {
            console.log("RESPONSE",response);
          },
          error: (error)=>{
            console.log("ocurrio un error");
          }
        });
    }
  }
}
