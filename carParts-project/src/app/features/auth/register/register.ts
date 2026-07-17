import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';



@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})

export class RegisterComponent implements AfterViewInit {

    protected authService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);

    registerForm: FormGroup;
    error = signal<string | null>(null);

    constructor() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZаА-яЯ]+$/)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZаА-яЯ]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                confirmPassword: ['', [Validators.required]]
            }, { validators: this.passwordMatchValidator.bind(this) })
        });
    }

    ngAfterViewInit(): void {
        this.registerForm.updateValueAndValidity();
    }

    private passwordMatchValidator(passwordsControl: AbstractControl): {[key: string]: any} | null {
        const password = passwordsControl.get('password');
        const confirmPassword = passwordsControl.get('confirmPassword');
        
        if (password && confirmPassword && password.value !== confirmPassword.value) {
            return { 'passwordMismatch': true };
        }
        return null;
    }

    get firstName(): AbstractControl | null {
        return this.registerForm.get('firstName');
    }

    get lastName(): AbstractControl | null {
        return this.registerForm.get('lastName');
    }

    get email(): AbstractControl | null {
        return this.registerForm.get('email');
    }

    get password(): AbstractControl | null {
        return this.registerForm.get('passwords.password');
    }

    get confirmPassword(): AbstractControl | null {
        return this.registerForm.get('passwords.confirmPassword');
    }

    get passwordsGroup(): FormGroup | null {
        return this.registerForm.get('passwords') as FormGroup;
    }

    get firstNameError(): boolean {
        return this.firstName?.invalid && (this.firstName?.touched || this.firstName?.dirty) || false;
    }

    get lastNameError(): boolean {
        return this.lastName?.invalid && (this.lastName?.touched || this.lastName?.dirty) || false;
    }

    get emailError(): boolean {
        return this.email?.invalid && (this.email?.touched || this.email?.dirty) || false;
    }

    get passwordError(): boolean {
        return this.password?.invalid && (this.password?.touched || this.password?.dirty) || false;
    }

    get confirmPasswordError(): boolean {
        const confirmPassword = this.confirmPassword;
        const passwordsGroup = this.passwordsGroup;
        const formError = passwordsGroup?.hasError('passwordMismatch') && 
                         (confirmPassword?.touched || confirmPassword?.dirty);
        const fieldError = confirmPassword?.invalid && (confirmPassword?.touched || confirmPassword?.dirty);
        return formError || fieldError || false;
    }

    get firstNameErrorMessage(): string | null {
        if (this.firstName?.errors?.['required'] && (this.firstName?.touched || this.firstName?.dirty)) {
            return 'First name is required';
        }
        if (this.firstName?.errors?.['minlength'] && (this.firstName?.touched || this.firstName?.dirty)) {
            return `First name must be at least ${this.firstName?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.firstName?.errors?.['maxlength'] && (this.firstName?.touched || this.firstName?.dirty)) {
            return `First name must be no more than ${this.firstName?.errors?.['maxlength'].requiredLength} characters long`;
        }
        if (this.firstName?.errors?.['pattern'] && (this.firstName?.touched || this.firstName?.dirty)) {
            return 'First name must contain only letters';
        }
        return '';
    }

    get lastNameErrorMessage(): string | null {
        if (this.lastName?.errors?.['required'] && (this.lastName?.touched || this.lastName?.dirty)) {
            return 'Last name is required';
        }
        if (this.lastName?.errors?.['minlength'] && (this.lastName?.touched || this.lastName?.dirty)) {
            return `Last name must be at least ${this.lastName?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.lastName?.errors?.['maxlength'] && (this.lastName?.touched || this.lastName?.dirty)) {
            return `Last name must be no more than ${this.lastName?.errors?.['maxlength'].requiredLength} characters long`;
        }
        if (this.lastName?.errors?.['pattern'] && (this.lastName?.touched || this.lastName?.dirty)) {
            return 'Last name must contain only letters';
        }
        return '';
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
        if (this.password?.errors?.['pattern'] && (this.password?.touched || this.password?.dirty)) {
            return 'Password must contain only English letters and numbers';
        }
        return '';
    }

    get confirmPasswordErrorMessage(): string | null {
        const confirmPassword = this.confirmPassword;
        const passwordsGroup = this.passwordsGroup;
        if (confirmPassword?.errors?.['required'] && (confirmPassword?.touched || confirmPassword?.dirty)) {
            return 'Confirm password is required';
        }
        if (passwordsGroup?.hasError('passwordMismatch') && (confirmPassword?.touched || confirmPassword?.dirty)) {
            return 'Passwords do not match';
        }
        return '';
    }

    get isFormReady(): boolean {
        return this.registerForm.valid;
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { firstName, lastName, email, passwords } = this.registerForm.value;
            const { password } = passwords;

            this.authService.register(firstName, lastName, email, password).subscribe({
                next: (user) => {
                    this.authService.registerSuccess(user);
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    console.error('Registration error:', error);
                    const errorMessage = error?.error?.message || error?.message || 'Registration failed. Please try again.';
                    this.error.set(errorMessage);
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


