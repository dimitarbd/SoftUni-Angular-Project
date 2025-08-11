import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-catalog-item',
  imports: [ CommonModule ],
  templateUrl: './catalog-item.html',
  styleUrl: './catalog-item.css'
})

export class CatalogItem {
    @Input() part!: Part;

    get ratingArray(): number[] {
        const rawRating = this.part?.rating ?? 0;
        const numericRating = typeof rawRating === 'string' ? parseInt(rawRating, 10) : Number(rawRating);
        const safeRating = Number.isFinite(numericRating) ? Math.max(0, Math.min(5, Math.floor(numericRating))) : 0;
        return Array.from({ length: safeRating }, (_, index) => index);
    }
}
