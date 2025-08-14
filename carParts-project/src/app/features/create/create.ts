import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './create.html',
    styleUrl: './create.css'
})
export class CreateComponent {

    protected authService = inject(AuthService);
    private router = inject(Router);

    titleError: boolean = false;
    titleErrorMessage: string = '';
    priceError: boolean = false;
    priceErrorMessage: string = '';
    descriptionError: boolean = false;
    descriptionErrorMessage: string = '';
    imageUrlError: boolean = false;
    imageUrlErrorMessage: string = '';
    categoryError: boolean = false;
    categoryErrorMessage: string = '';
    quantityError: boolean = false;
    quantityErrorMessage: string = '';
    brandError: boolean = false;
    brandErrorMessage: string = '';
    modelError: boolean = false;
    modelErrorMessage: string = '';
    yearError: boolean = false;
    yearErrorMessage: string = '';
    ratingError: boolean = false;
    ratingErrorMessage: string = '';

    validateTitle(): void {
        if (!this.formData.title) {
            this.titleError = true;
            this.titleErrorMessage = 'Title is required';
        }
    }

    validatePrice(): void {
        if (!this.formData.price) {
            this.priceError = true;
            this.priceErrorMessage = 'Price is required';
        } else if (isNaN(Number(this.formData.price))) {
            this.priceError = true;
            this.priceErrorMessage = 'Price must be a number';
        } else if (Number(this.formData.price) <= 0) {
            this.priceError = true;
            this.priceErrorMessage = 'Price must be greater than 0';
        }
    }

    validateDescription(): void {
        if (!this.formData.description) {
            this.descriptionError = true;
            this.descriptionErrorMessage = 'Description is required';
        }
    }

    validateImageUrl(): void {
        if (!this.formData.imageUrl) {
            this.imageUrlError = true;
            this.imageUrlErrorMessage = 'Image URL is required';
        }
    }

    validateCategory(): void {
        if (!this.formData.category) {
            this.categoryError = true;
            this.categoryErrorMessage = 'Category is required';
        }
    }

    validateQuantity(): void {
        if (!this.formData.quantity) {
            this.quantityError = true;
            this.quantityErrorMessage = 'Quantity is required';
        } else if (isNaN(Number(this.formData.quantity))) {
            this.quantityError = true;
            this.quantityErrorMessage = 'Quantity must be a number';
        } else if (Number(this.formData.quantity) <= 0) {
            this.quantityError = true;
            this.quantityErrorMessage = 'Quantity must be greater than 0';
        }
    }

    validateBrand(): void {
        if (!this.formData.brand) {
            this.brandError = true;
            this.brandErrorMessage = 'Brand is required';
        }
    }

    validateModel(): void {
        if (!this.formData.model) {
            this.modelError = true;
            this.modelErrorMessage = 'Model is required';
        }
    }

    validateYear(): void {
        if (!this.formData.year) {
            this.yearError = true;
            this.yearErrorMessage = 'Year is required';
        } else if (isNaN(Number(this.formData.year))) {
            this.yearError = true;
            this.yearErrorMessage = 'Year must be a number';
        } else if (Number(this.formData.year) <= 0) {
            this.yearError = true;
            this.yearErrorMessage = 'Year must be greater than 0';
        }
    }

    validateRating(): void {
        if (!this.formData.rating) {
            this.ratingError = true;
            this.ratingErrorMessage = 'Rating is required';
        } else if (isNaN(Number(this.formData.rating))) {
            this.ratingError = true;
            this.ratingErrorMessage = 'Rating must be a number';
        } else if (Number(this.formData.rating) < 1 || Number(this.formData.rating) > 5) {
            this.ratingError = true;
            this.ratingErrorMessage = 'Rating must be between 1 and 5';
        }
    }

    isFormValid(): boolean {
        return !this.titleError && !this.priceError && !this.descriptionError && !this.imageUrlError && !this.categoryError && !this.quantityError && !this.brandError && !this.modelError && !this.yearError && !this.ratingError;
    }

    error = '';
    formData = {
        title: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
        quantity: '',
        brand: '',
        model: '',
        year: '',
        rating: ''
    };

    constructor(private parts: PartService) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }
    }

    onCancel(): void {
        this.router.navigateByUrl('/catalog');
    }

    onSubmit(): void {
        this.validateTitle();
        this.validatePrice();
        this.validateDescription();
        this.validateImageUrl();
        this.validateCategory();
        this.validateQuantity();
        this.validateBrand();
        this.validateModel();
        this.validateYear();
        this.validateRating();

        if (!this.isFormValid()) {
            return;
        }

        this.parts.createPart(this.formData).subscribe({
            next: (created: any) => this.router.navigate(['/catalog', created._id, 'details']),
            error: () => { }
        });
    }
}


