import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

    private authService = inject(AuthService);
    private router = inject(Router);

  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  passwordError: boolean = false;
  emailError: boolean = false;
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  error = signal<string>('');

  validateEmail(): void {
    if (!this.email) {
        this.emailError = true;
        this.emailErrorMessage = 'Email is required';
      } else if (!this.isEmailValid(this.email)) {
        this.emailError = true;
        this.emailErrorMessage = 'Invalid email';
      } else {
          this.emailError = false;
          this.emailErrorMessage = '';
      }
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(): void {
    this.passwordError = false;
    this.passwordErrorMessage = '';

    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required';
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters long';
    } else {
        this.passwordError = true;
        this.passwordErrorMessage = '';
    }
  }

  isFormValid(): boolean {
    return Boolean(this.email) && Boolean(this.password) && !this.emailError && !this.passwordError;
  }

  onSubmit(): void {
    this.validateEmail();   
    this.validatePassword();
    
    if (!this.isFormValid()) {
      return;
    }

    const response = this.authService.login(this.email, this.password);
    if (response) {
      this.router.navigate(['/']);
    } 
    
  }
}


