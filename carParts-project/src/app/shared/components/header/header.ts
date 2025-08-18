import { Component, inject, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { SearchService } from '../../../core/services/search.service';
import { CategoryFilterService } from '../../../core/services/category-filter.service';
import { PartService } from '../../../core/services/part.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  animations: [
    trigger('categoryMenuAnimation', [
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      state('open', style({
        height: '*',
        opacity: 1
      })),
      transition('closed <=> open', [
        animate('1000ms ease-in-out')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

    protected authService = inject(AuthService);
    private router = inject(Router);
    private searchService = inject(SearchService);
    private categoryFilterService = inject(CategoryFilterService);
    private partService = inject(PartService);

    readonly isLoggedIn = () => this.authService.isLoggedIn();
    readonly currentUser = this.authService.currentUser;

    searchTerm = '';
    isCategoriesOpen = false;
    isMyAccountDropdownOpen = false;
    categories: string[] = [];
    private categoriesSubscription?: Subscription;

  toggleCategories(): void {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }

  toggleMyAccountDropdown(): void {
    this.isMyAccountDropdownOpen = !this.isMyAccountDropdownOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
        next: () => {
            this.router.navigate(['/']);
        },
        error: (err: unknown) => {
            console.log('Logout failed', err);
        }
    });
}

// logout(): void {
//     this.authService.logout(); // Perform synchronous logout
//     this.router.navigate(['/']);
// }


  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    if (this.searchTerm.trim()) {
      this.searchService.setSearchTerm(this.searchTerm);
      this.router.navigate(['/catalog'], { 
        queryParams: { search: this.searchTerm.trim() } 
      });
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchService.clearSearchTerm();
  }

  ngOnInit(): void {
    // Load categories from the parts data
    this.categoriesSubscription = this.partService.getParts().subscribe(parts => {
      const categorySet = new Set<string>();
      parts.forEach(part => {
        if (part.category && part.category.trim()) {
          categorySet.add(part.category.trim());
        }
      });
      this.categories = Array.from(categorySet).sort();
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  selectCategory(category: string): void {
    // Navigate to catalog with category filter
    this.categoryFilterService.setCategory(category);
    this.router.navigate(['/catalog'], { 
      queryParams: { category: category } 
    });
    // Close the categories menu
    this.isCategoriesOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    
    // Close my account dropdown if clicked outside
    if (!target.closest('.dropdown-holder')) {
      this.isMyAccountDropdownOpen = false;
    }
    
    // Close categories dropdown if clicked outside
    if (!target.closest('.category-menu')) {
      this.isCategoriesOpen = false;
    }
  }
}
