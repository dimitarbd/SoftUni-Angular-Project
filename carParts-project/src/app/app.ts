import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { ErrorNotification } from './shared/components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
 
}


