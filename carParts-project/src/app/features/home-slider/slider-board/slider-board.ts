import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { SliderItemComponent } from '../slider-item/slider';
import { CategoryFilterService } from '../../../core/services/category-filter.service';

@Component({
    selector: 'app-slider-board',
    standalone: true,
    imports: [NgFor, SliderItemComponent],
    templateUrl: './slider-board.html',
    styleUrl: './slider-board.css'
})
export class SliderBoardComponent {
    items: any[] = [
        {
            id: 1,
            animationClass: 'animation-style-01',
            bgClass: 'bg-3',
            contentClass: '',
            primary: false,
            subtitle: 'New thinking new possibilities',
            title: 'Body & Exterior',
            priceText: 'Starting at <span>$99.00</span>',
            buttonText: 'Read More',
            category: 'Body and Exterior'
        },
        {
            id: 2,
            animationClass: 'animation-style-02',
            bgClass: 'bg-4',
            contentClass: 'slider-content-2',
            primary: true,
            subtitle: 'Car, Truck, CUV & SUV Tires',
            title: 'Exhaust System',
            priceText: 'Sale up to 20% off',
            buttonText: 'Read More',
            category: 'Exhaust System'
        }
    ];

    activeIndex = 0;

    constructor(
        private router: Router,
        private categoryFilterService: CategoryFilterService
    ) {}

    nextSlide(): void {
        this.activeIndex = (this.activeIndex + 1) % this.items.length;
    }

    prevSlide(): void {
        this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
    }

    goToSlide(index: number): void {
        if (index < 0 || index >= this.items.length) return;
        this.activeIndex = index;
    }

    navigateToCategory(category: string): void {
        // Set the category in the service
        this.categoryFilterService.setCategory(category);
        // Navigate to catalog
        this.router.navigate(['/catalog']);
    }
}
