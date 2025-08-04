import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { SliderBoardComponent } from './features/home-slider/slider-board/slider-board';
import { ProductBoard } from './features/products/product-board/product-board';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SliderBoardComponent, ProductBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private title = 'carParts-project';
}
