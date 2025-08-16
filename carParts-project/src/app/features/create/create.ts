import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './create.html',
    styleUrl: './create.css'
})
export class CreateComponent {

    protected authService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder);
    private parts = inject(PartService);

    createForm: FormGroup;
    error = signal<string | null>(null);

    constructor() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }

        this.createForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            price: ['', [Validators.required, Validators.min(0.01)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
            imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
            category: ['', [Validators.required]],
            quantity: ['', [Validators.required, Validators.min(1)]],
            brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            year: ['', [Validators.required, Validators.min(1900), Validators.max(2030)]],
            rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
        });
    }

    // Form control getters
    get title() { return this.createForm.get('title'); }
    get price() { return this.createForm.get('price'); }
    get description() { return this.createForm.get('description'); }
    get imageUrl() { return this.createForm.get('imageUrl'); }
    get category() { return this.createForm.get('category'); }
    get quantity() { return this.createForm.get('quantity'); }
    get brand() { return this.createForm.get('brand'); }
    get year() { return this.createForm.get('year'); }
    get rating() { return this.createForm.get('rating'); }

    // Error state getters
    get titleError(): boolean {
        return this.title?.invalid && (this.title?.touched || this.title?.dirty) || false;
    }

    get priceError(): boolean {
        return this.price?.invalid && (this.price?.touched || this.price?.dirty) || false;
    }

    get descriptionError(): boolean {
        return this.description?.invalid && (this.description?.touched || this.description?.dirty) || false;
    }

    get imageUrlError(): boolean {
        return this.imageUrl?.invalid && (this.imageUrl?.touched || this.imageUrl?.dirty) || false;
    }

    get categoryError(): boolean {
        return this.category?.invalid && (this.category?.touched || this.category?.dirty) || false;
    }

    get quantityError(): boolean {
        return this.quantity?.invalid && (this.quantity?.touched || this.quantity?.dirty) || false;
    }

    get brandError(): boolean {
        return this.brand?.invalid && (this.brand?.touched || this.brand?.dirty) || false;
    }

    get yearError(): boolean {
        return this.year?.invalid && (this.year?.touched || this.year?.dirty) || false;
    }

    get ratingError(): boolean {
        return this.rating?.invalid && (this.rating?.touched || this.rating?.dirty) || false;
    }

    // Error message getters
    get titleErrorMessage(): string {
        if (this.title?.errors?.['required'] && (this.title?.touched || this.title?.dirty)) {
            return 'Title is required';
        }
        if (this.title?.errors?.['minlength'] && (this.title?.touched || this.title?.dirty)) {
            return `Title must be at least ${this.title?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.title?.errors?.['maxlength'] && (this.title?.touched || this.title?.dirty)) {
            return `Title must be no more than ${this.title?.errors?.['maxlength'].requiredLength} characters long`;
        }
        return '';
    }

    get priceErrorMessage(): string {
        if (this.price?.errors?.['required'] && (this.price?.touched || this.price?.dirty)) {
            return 'Price is required';
        }
        if (this.price?.errors?.['min'] && (this.price?.touched || this.price?.dirty)) {
            return 'Price must be greater than 0';
        }
        return '';
    }

    get descriptionErrorMessage(): string {
        if (this.description?.errors?.['required'] && (this.description?.touched || this.description?.dirty)) {
            return 'Description is required';
        }
        if (this.description?.errors?.['minlength'] && (this.description?.touched || this.description?.dirty)) {
            return `Description must be at least ${this.description?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.description?.errors?.['maxlength'] && (this.description?.touched || this.description?.dirty)) {
            return `Description must be no more than ${this.description?.errors?.['maxlength'].requiredLength} characters long`;
        }
        return '';
    }

    get imageUrlErrorMessage(): string {
        if (this.imageUrl?.errors?.['required'] && (this.imageUrl?.touched || this.imageUrl?.dirty)) {
            return 'Image URL is required';
        }
        if (this.imageUrl?.errors?.['pattern'] && (this.imageUrl?.touched || this.imageUrl?.dirty)) {
            return 'Please enter a valid URL starting with http:// or https://';
        }
        return '';
    }

    get categoryErrorMessage(): string {
        if (this.category?.errors?.['required'] && (this.category?.touched || this.category?.dirty)) {
            return 'Category is required';
        }
        return '';
    }

    get quantityErrorMessage(): string {
        if (this.quantity?.errors?.['required'] && (this.quantity?.touched || this.quantity?.dirty)) {
            return 'Quantity is required';
        }
        if (this.quantity?.errors?.['min'] && (this.quantity?.touched || this.quantity?.dirty)) {
            return 'Quantity must be at least 1';
        }
        return '';
    }

    get brandErrorMessage(): string {
        if (this.brand?.errors?.['required'] && (this.brand?.touched || this.brand?.dirty)) {
            return 'Brand is required';
        }
        if (this.brand?.errors?.['minlength'] && (this.brand?.touched || this.brand?.dirty)) {
            return `Brand must be at least ${this.brand?.errors?.['minlength'].requiredLength} characters long`;
        }
        if (this.brand?.errors?.['maxlength'] && (this.brand?.touched || this.brand?.dirty)) {
            return `Brand must be no more than ${this.brand?.errors?.['maxlength'].requiredLength} characters long`;
        }
        return '';
    }

    get yearErrorMessage(): string {
        if (this.year?.errors?.['required'] && (this.year?.touched || this.year?.dirty)) {
            return 'Year is required';
        }
        if (this.year?.errors?.['min'] && (this.year?.touched || this.year?.dirty)) {
            return 'Year must be 1900 or later';
        }
        if (this.year?.errors?.['max'] && (this.year?.touched || this.year?.dirty)) {
            return 'Year must be 2030 or earlier';
        }
        return '';
    }

    get ratingErrorMessage(): string {
        if (this.rating?.errors?.['required'] && (this.rating?.touched || this.rating?.dirty)) {
            return 'Rating is required';
        }
        if (this.rating?.errors?.['min'] && (this.rating?.touched || this.rating?.dirty)) {
            return 'Rating must be at least 1';
        }
        if (this.rating?.errors?.['max'] && (this.rating?.touched || this.rating?.dirty)) {
            return 'Rating must be no more than 5';
        }
        return '';
    }

    get isFormReady(): boolean {
        return this.createForm.valid;
    }

    onCancel(): void {
        this.router.navigateByUrl('/catalog');
    }

    onSubmit(): void {
        if (this.createForm.valid) {
            const formData = this.createForm.value;

            this.parts.createPart(formData).subscribe({
                next: (created: any) => {
                    console.log('Part created successfully:', created);
                    this.router.navigate(['/catalog', created._id, 'details']);
                },
                error: (error) => {
                    console.error('Error creating part:', error);
                    const errorMessage = error?.error?.message || error?.message || 'Failed to create part. Please try again.';
                    this.error.set(errorMessage);
                    this.markFormGroupTouched(this.createForm);
                }
            });
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(this.createForm.controls).forEach(key => {
            const control = this.createForm.get(key);
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            } else {
                control?.markAsTouched();
            }
        });
    }
}


