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


