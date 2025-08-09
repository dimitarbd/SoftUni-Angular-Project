import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { SliderBoardComponent } from './features/home-slider/slider-board/slider-board';
import { ProductBoard } from './features/new-products/new-product-board/new-product-board';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SliderBoardComponent, ProductBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
 
}
