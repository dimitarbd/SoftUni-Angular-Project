import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-slider-item',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderItemComponent {
    @Input() item: any;
}
