import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-catalog-item',
  imports: [ CommonModule, RouterLink ],
  templateUrl: './catalog-item.html',
  styleUrl: './catalog-item.css',
  host: { class: 'col-lg-4 col-md-6 col-sm-6' }
})

export class CatalogItem {
    @Input() part!: Part;

    get stars(): boolean[] {
        const rawRating = this.part?.rating ?? 0;
        const numericRating = typeof rawRating === 'string' ? parseFloat(rawRating) : Number(rawRating);
        const safeRating = Number.isFinite(numericRating) ? Math.max(0, Math.min(5, Math.floor(numericRating))) : 0;
        return Array.from({ length: 5 }, (_, i) => i < safeRating);
    }
}
