import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { Part } from '../../models/part.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class EditComponent {
  partId = '';
  isLoading = true;
  formData: Partial<Part> = {};
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partService: PartService,
    private authService: AuthService
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
    this.partService.getOne(this.partId).subscribe({
      next: (part) => { this.formData = part; this.isLoading = false; },
      error: () => { this.router.navigateByUrl('/catalog'); }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    this.partService.updatePart(this.partId, this.formData).subscribe({
      next: () => this.router.navigate(['/catalog', this.partId, 'details']),
      error: () => this.isLoading = false
    });
  }
}


