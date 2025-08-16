import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { Part } from '../../models/part.model';
import { User } from '../../models/user.model';
import { RingSpinnerComponent } from '../../shared/components/loading-spinner/spinner-variants';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, RingSpinnerComponent],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css'
})
export class MyAccountComponent {
  private formBuilder = inject(FormBuilder);
  private parts = inject(PartService);
  private auth = inject(AuthService);
  private route = inject(ActivatedRoute);

  email = '';
  offers: Part[] = [];
  loading = true;
  error = '';
  stars = [0,1,2,3,4];
  
  accountDetailsForm: FormGroup;
  updateError = signal<string | null>(null);
  updateSuccess = signal<string | null>(null);
  updating = signal<boolean>(false);
  activeTab = signal<string>('dashboard'); 

  constructor() {
    const userId = this.auth.getCurrentUserId();
    const currentUser = this.auth.currentUser();
    this.email = currentUser?.email ?? '';
    
   
    this.accountDetailsForm = this.formBuilder.group({
      firstName: [currentUser?.firstName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZаА-яЯ]+$/)]],
      lastName: [currentUser?.lastName || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZаА-яЯ]+$/)]],
      email: [currentUser?.email || '', [Validators.required, Validators.email]]
    });

    effect(() => {
      const user = this.auth.currentUser();
      if (user && this.accountDetailsForm) {
        this.updateFormWithUserData(user);
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.setActiveTab(params['tab']);
      }
    });

    if (userId) {
      this.parts.getByOwner(userId).subscribe({
        next: (data) => { this.offers = data; this.loading = false; },
        error: () => { this.error = 'Failed to load your offers'; this.loading = false; }
      });
    } else {
      this.loading = false;
    }
  }

  isSilver(index: number, rating: any): boolean {
    const numericRating = typeof rating === 'string' ? parseInt(rating, 10) : Number(rating ?? 0);
    const safe = Number.isFinite(numericRating) ? Math.max(0, Math.min(5, Math.floor(numericRating))) : 0;
    return (index + 1) > safe;
  }

  currentUser() {
    return this.auth.currentUser();
  }

  logout(): void {
    this.auth.logout();
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  get firstName() { return this.accountDetailsForm.get('firstName'); }
  get lastName() { return this.accountDetailsForm.get('lastName'); }
  get emailControl() { return this.accountDetailsForm.get('email'); }

  get firstNameError(): boolean {
    return this.firstName?.invalid && (this.firstName?.touched || this.firstName?.dirty) || false;
  }

  get lastNameError(): boolean {
    return this.lastName?.invalid && (this.lastName?.touched || this.lastName?.dirty) || false;
  }

  get emailError(): boolean {
    return this.emailControl?.invalid && (this.emailControl?.touched || this.emailControl?.dirty) || false;
  }

  get firstNameErrorMessage(): string {
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

  get lastNameErrorMessage(): string {
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

  get emailErrorMessage(): string {
    if (this.emailControl?.errors?.['required'] && (this.emailControl?.touched || this.emailControl?.dirty)) {
      return 'Email is required';
    }
    if (this.emailControl?.errors?.['email'] && (this.emailControl?.touched || this.emailControl?.dirty)) {
      return 'Invalid email';
    }
    return '';
  }

  get isFormReady(): boolean {
    return this.firstName?.valid && this.lastName?.valid && this.emailControl?.valid || false;
  }

  onUpdateAccount(): void {
    if (this.isFormReady && this.accountDetailsForm.valid) {
      this.updating.set(true);
      this.updateError.set(null);
      this.updateSuccess.set(null);

      const formData = this.accountDetailsForm.value;
      const userId = this.auth.getCurrentUserId();
      
      if (userId) {
        const updateData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email
        };

        this.auth.updateAccount(userId, updateData).subscribe({
          next: (updatedUser) => {
            this.updating.set(false);
            this.updateSuccess.set('Account details updated successfully!');
            
            if (updatedUser && updatedUser._id) {
              this.auth.updateAccountSuccess(updatedUser);
            } else {
              const currentUser = this.auth.currentUser();
              if (currentUser) {
                const manualUpdate: User = {
                  ...currentUser,
                  firstName: updateData.firstName,
                  lastName: updateData.lastName,
                  email: updateData.email
                };
                this.auth.updateAccountSuccess(manualUpdate);
              }
            }
          },
          error: (error) => {
            this.updating.set(false);
            this.updateError.set(error.error?.message || 'Failed to update account details');
          }
        });
      } else {
        this.updating.set(false);
        this.updateError.set('User not found. Please log in again.');
      }
    } else {
      this.markFormGroupTouched(this.accountDetailsForm);
    }
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

  private updateFormWithUserData(user: User) {
    if (this.accountDetailsForm) {
      this.accountDetailsForm.patchValue({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }, { emitEvent: false }); 
      
      this.email = user.email || '';
    }
  }
}


