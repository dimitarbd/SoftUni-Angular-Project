import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() categoryNavigate = new EventEmitter<string>();

    onButtonClick(): void {
        if (this.item.category) {
            this.categoryNavigate.emit(this.item.category);
        }
    }
}
