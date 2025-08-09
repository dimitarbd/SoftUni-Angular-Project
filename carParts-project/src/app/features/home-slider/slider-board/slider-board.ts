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

}
