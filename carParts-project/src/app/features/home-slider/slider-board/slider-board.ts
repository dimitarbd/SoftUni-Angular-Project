import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SliderItemComponent } from '../slider-item/slider';

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
      buttonHref: '/catalog'
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
      buttonHref: '/catalog'
    }
  ];

  activeIndex = 0;

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
}
