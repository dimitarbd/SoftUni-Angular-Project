import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class LoginComponent {

    protected authService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    loginForm: FormGroup;

    constructor() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
            rememberMe: [false]
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    get emailError(): boolean {
        return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
    }

    get passwordError(): boolean {
        return this.password?.invalid && (this.password?.touched || this.password?.dirty) || false;
    }

    get rememberMe() {
        return this.loginForm.get('rememberMe');
    }

    get emailErrorMessage(): string | null {
        if (this.email?.errors?.['required'] && (this.email?.touched || this.email?.dirty)) {
            return 'Email is required';
        }
        if (this.email?.errors?.['email'] && (this.email?.touched || this.email?.dirty)) {
            return 'Invalid email';
        }
        return '';
    }

    get passwordErrorMessage(): string | null {
        if (this.password?.errors?.['required'] && (this.password?.touched || this.password?.dirty)) {
            return 'Password is required';
        }
        if (this.password?.errors?.['minlength'] && (this.password?.touched || this.password?.dirty)) {
            return `Password must be at least ${this.password?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.password?.errors?.['maxlength'] && (this.password?.touched || this.password?.dirty)) {
            return `Password must be no more than ${this.password?.errors?.['maxlength'].requiredLength} characters long`;
        }
        return '';
    }

    error = signal<string | null>(null);

    get isFormReady(): boolean {
        const email = this.email?.value;
        const password = this.password?.value;
        
        return !!(email && password && this.loginForm.valid);
    }

    onSubmit(): void {
        if (this.loginForm.valid) {

            const { email, password } = this.loginForm.value;

            this.authService.login(email, password).subscribe({
                next: (user) => {
                    this.authService.loginSuccess(user);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.error.set('Invalid email or password');
                    this.markFormGroupTouched(this.loginForm);
                }
            });

        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            } else {
                control?.markAsTouched();
            }
        });
    }
}


