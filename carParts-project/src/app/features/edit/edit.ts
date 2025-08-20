import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { Part } from '../../models/part.model';
import { RingSpinnerComponent } from '../../shared/components/loading-spinner/spinner-variants';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, RingSpinnerComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditComponent {
  partId = '';
  isLoading = true;
  editForm!: FormGroup;
  error = '';
  readonly currentYear = new Date().getFullYear();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.partId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.partId) {
      this.router.navigateByUrl('/catalog');
      return;
    }

    // Initialize reactive form
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      brand: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    this.partService.getOne(this.partId).subscribe({
      next: (part) => {
        // Patch values into the reactive form
        this.editForm.patchValue({
          title: part.title ?? '',
          price: part.price ?? '',
          description: part.description ?? '',
          imageUrl: part.imageUrl ?? '',
          category: part.category ?? '',
          quantity: part.quantity ?? '',
          brand: part.brand ?? '',
          year: part.year ?? '',
          rating: part.rating ?? ''
        });
        this.isLoading = false;
      },
      error: () => { this.router.navigateByUrl('/catalog'); }
    });
  }

  onSubmit(): void {
    if (!this.editForm.valid) {
      this.markFormGroupTouched(this.editForm);
      return;
    }
    this.isLoading = true;
    this.partService.updatePart(this.partId, this.editForm.value as Partial<Part>).subscribe({
      next: () => this.router.navigate(['/catalog', this.partId, 'details']),
      error: () => this.isLoading = false
    });
  }

  get isFormReady(): boolean {
    return this.editForm?.valid ?? false;
  }

  // Form control getters
  get title() { return this.editForm.get('title'); }
  get price() { return this.editForm.get('price'); }
  get description() { return this.editForm.get('description'); }
  get imageUrl() { return this.editForm.get('imageUrl'); }
  get category() { return this.editForm.get('category'); }
  get quantity() { return this.editForm.get('quantity'); }
  get brand() { return this.editForm.get('brand'); }
  get year() { return this.editForm.get('year'); }
  get rating() { return this.editForm.get('rating'); }

  // Error state getters
  get titleError(): boolean { return this.title?.invalid && (this.title?.touched || this.title?.dirty) || false; }
  get priceError(): boolean { return this.price?.invalid && (this.price?.touched || this.price?.dirty) || false; }
  get descriptionError(): boolean { return this.description?.invalid && (this.description?.touched || this.description?.dirty) || false; }
  get imageUrlError(): boolean { return this.imageUrl?.invalid && (this.imageUrl?.touched || this.imageUrl?.dirty) || false; }
  get categoryError(): boolean { return this.category?.invalid && (this.category?.touched || this.category?.dirty) || false; }
  get quantityError(): boolean { return this.quantity?.invalid && (this.quantity?.touched || this.quantity?.dirty) || false; }
  get brandError(): boolean { return this.brand?.invalid && (this.brand?.touched || this.brand?.dirty) || false; }
  get yearError(): boolean { return this.year?.invalid && (this.year?.touched || this.year?.dirty) || false; }
  get ratingError(): boolean { return this.rating?.invalid && (this.rating?.touched || this.rating?.dirty) || false; }

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
      return `Year must be ${this.currentYear} or earlier`;
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

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}


