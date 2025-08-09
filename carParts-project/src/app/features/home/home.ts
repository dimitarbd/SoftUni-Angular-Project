import { Component } from '@angular/core';
import { NewProductBoard } from '../new-products/new-product-board/new-product-board';
import { SliderBoardComponent } from '../home-slider/slider-board/slider-board';

@Component({
  selector: 'app-home',
  imports: [SliderBoardComponent, NewProductBoard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
