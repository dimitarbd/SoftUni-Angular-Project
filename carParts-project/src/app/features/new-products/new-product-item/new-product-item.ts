import { Component, Input, OnChanges } from '@angular/core';
import { Part } from '../../../models/part.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-new-product-item',
  imports: [RouterLink],
  templateUrl: './new-product-item.html',
  styleUrl: './new-product-item.css'
})
export class NewProductItem implements OnChanges {

    @Input() part!: Part;
    
    stars: boolean[] = [false, false, false, false, false];

    ngOnChanges(): void {
        const rawRating = this.part?.rating ?? 0;
        const numericRating = typeof rawRating === 'string' ? parseFloat(rawRating) : Number(rawRating);
        const safeRating = Number.isFinite(numericRating) ? Math.max(0, Math.min(5, Math.floor(numericRating))) : 0;
        this.stars = Array.from({ length: 5 }, (_, i) => i < safeRating);
    }

}
