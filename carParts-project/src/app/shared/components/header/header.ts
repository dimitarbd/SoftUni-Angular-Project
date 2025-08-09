import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  isCategoriesOpen = false;

  toggleCategories(): void {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }
}
