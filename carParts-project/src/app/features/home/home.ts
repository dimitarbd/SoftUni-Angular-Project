import { Component } from '@angular/core';
import { NewProductBoard } from '../new-products/new-product-board/new-product-board';
import { SliderBoardComponent } from '../home-slider/slider-board/slider-board';
import { ShippingComponent } from '../../shared/components/shipping/shipping';

@Component({
  selector: 'app-home',
  imports: [SliderBoardComponent, NewProductBoard, ShippingComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

}
