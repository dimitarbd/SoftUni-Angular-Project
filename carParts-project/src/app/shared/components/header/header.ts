import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

    protected authService = inject(AuthService);
    private router = inject(Router);

    readonly isLoggedIn = () => this.authService.isLoggedIn();
    readonly currentUser = this.authService.currentUser;

    
  isCategoriesOpen = false;

  toggleCategories(): void {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
