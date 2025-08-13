import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PartService } from '../../core/services/part.service';
import { AuthService } from '../../core/services/auth.service';
import { Part } from '../../models/part.model';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css'
})
export class MyAccountComponent {
  email = '';
  offers: Part[] = [];
  loading = true;
  error = '';
  stars = [0,1,2,3,4];

  constructor(private parts: PartService, private auth: AuthService) {
    const uid = this.auth.getCurrentUserId();
    this.email = (this.auth as any).currentUser?.()?.email ?? '';
    if (uid) {
      this.parts.getByOwner(uid).subscribe({
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
}


