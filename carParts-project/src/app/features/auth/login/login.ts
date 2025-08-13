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

  validatePassword(): boolean {
    // reset
    this.emailError = false;
    this.passwordError = false;
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';

    let valid = true;

    

    if (!this.password) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password is required';
      valid = false;
    } else if (this.password.length < 4) {
      this.passwordError = true;
      this.passwordErrorMessage = 'Password must be at least 4 characters long';
      valid = false;
    } else {
        this.passwordError = true;
        this.passwordErrorMessage = '';
    }

    return valid;
  }

  onSubmit(): void {
    if (this.emailError || this.passwordError) {
      return;
    }
    const ok = this.authService.login(this.email, this.password);
    if (ok) {
      this.router.navigateByUrl('/');
    } else {
      this.error.set('Invalid email or password');
    }
  }
}


