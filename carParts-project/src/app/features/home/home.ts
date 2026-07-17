import { Component, inject } from '@angular/core';
import { NewProductBoard } from '../new-products/new-product-board/new-product-board';
import { SliderBoardComponent } from '../home-slider/slider-board/slider-board';
import { ShippingComponent } from '../../shared/components/shipping/shipping';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [SliderBoardComponent, NewProductBoard, ShippingComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

    protected authService = inject(AuthService);
    readonly isLoggedIn = this.authService.isLoggedIn;
    readonly currentUser = this.authService.currentUser;

}
