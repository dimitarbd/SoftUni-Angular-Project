import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

// Custom validator for password confirmation
function passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
    }
    return null;
}

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})

export class RegisterComponent {

    protected authService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    registerForm: FormGroup;
    error = signal<string | null>(null);

    constructor() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
            confirmPassword: ['', [Validators.required]]
        }, { validators: passwordMatchValidator });
    }

    get email() {
        return this.registerForm.get('email');
    }

    get password() {
        return this.registerForm.get('password');
    }

    get confirmPassword() {
        return this.registerForm.get('confirmPassword');
    }

    get emailError(): boolean {
        return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
    }

    get passwordError(): boolean {
        return this.password?.invalid && (this.password?.touched || this.password?.dirty) || false;
    }

    get confirmPasswordError(): boolean {
        const confirmPassword = this.confirmPassword;
        const formError = this.registerForm.hasError('passwordMismatch') && 
                         (confirmPassword?.touched || confirmPassword?.dirty);
        const fieldError = confirmPassword?.invalid && (confirmPassword?.touched || confirmPassword?.dirty);
        return formError || fieldError || false;
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

    get confirmPasswordErrorMessage(): string | null {
        const confirmPassword = this.confirmPassword;
        if (confirmPassword?.errors?.['required'] && (confirmPassword?.touched || confirmPassword?.dirty)) {
            return 'Confirm password is required';
        }
        if (this.registerForm.hasError('passwordMismatch') && (confirmPassword?.touched || confirmPassword?.dirty)) {
            return 'Passwords do not match';
        }
        return '';
    }

    get isFormReady(): boolean {
        return this.registerForm.valid;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { email, password } = this.registerForm.value;

            this.authService.register(email, password).subscribe({
                next: (user) => {
                    this.authService.registerSuccess(user);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    this.error.set('Registration failed. Please try again.');
                    this.markFormGroupTouched(this.registerForm);
                }
            });
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(this.registerForm.controls).forEach(key => {
            const control = this.registerForm.get(key);
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            } else {
                control?.markAsTouched();
            }
        });
    }
}


