import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './import.html',
  styleUrl: './import.css'
})
export class ImportComponent {
  error = '';
  formData: any = {
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

  constructor(private parts: PartService, private auth: AuthService, private router: Router) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  onSubmit(): void {
    this.parts.createPart(this.formData).subscribe({
      next: (created: any) => this.router.navigate(['/catalog', created._id, 'details']),
      error: () => {}
    });
  }
}


