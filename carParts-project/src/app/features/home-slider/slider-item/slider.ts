import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-slider-item',
  imports: [NgClass, NgIf],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderItemComponent {
    @Input() item: any;
    @Input() active = false;
}
