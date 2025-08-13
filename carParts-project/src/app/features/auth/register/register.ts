import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class RegisterComponent {


    private authService = inject(AuthService);
    private router = inject(Router);

    email: string = '';
    password: string = '';
    repassword: string = '';
    error = signal<string>('');

    usernameError: boolean = false;
    usernameErrorMessage: string = '';
    emailError: boolean = false;
    emailErrorMessage: string = '';
    passwordError: boolean = false;
    passwordErrorMessage: string = '';
    repasswordError: boolean = false;
    repasswordErrorMessage: string = '';

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
        if (!this.password) {
            this.passwordError = true;
            this.passwordErrorMessage = 'Password is required';
        } else if (!this.isPasswordValid()) {
            this.passwordError = true;
            this.passwordErrorMessage = 'Password must be at least 4 characters long';
        } else {
            this.passwordError = false;
            this.passwordErrorMessage = '';
        }
    }

    isPasswordValid(): boolean {
        return this.password.length >= 4;
    }

    validateRePassword(): void {
        if (!this.repassword) {
            this.repasswordError = true;
            this.repasswordErrorMessage = 'Confirm password is required';
        } else if (this.password !== this.repassword) {
            this.repasswordError = true;
            this.repasswordErrorMessage = 'Passwords do not match';
        } else {
            this.repasswordError = false;
            this.repasswordErrorMessage = '';
        }
    }

    isFormValid(): boolean {
        return Boolean(this.email) && 
        Boolean(this.password) && 
        Boolean(this.repassword) && 
        !this.emailError && 
        !this.passwordError && 
        !this.repasswordError &&
        this.password === this.repassword;
    }

    onSubmit(): void {
        this.validateEmail();
        this.validatePassword();
        this.validateRePassword();

        if (this.isFormValid()) {
            
            const response = this.authService.register(this.email, this.password, this.repassword);
            if (response) {
                this.router.navigate(['/']);
            } else {
                this.error.set('Registration failed');
            }
        } else {
            this.error.set('Registration failed');
        }
    }
}


