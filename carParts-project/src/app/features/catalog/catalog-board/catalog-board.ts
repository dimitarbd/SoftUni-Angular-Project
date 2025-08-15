import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { CatalogItem } from '../catalog-item/catalog-item';
import { Part } from '../../../models/part.model';
import { PartService } from '../../../core/services/part.service';
import { CategoryFilterService } from '../../../core/services/category-filter.service';
import { SearchService } from '../../../core/services/search.service';
import { RingSpinnerComponent } from '../../../shared/components/loading-spinner/spinner-variants';

@Component({
  standalone: true,
  selector: 'app-catalog-board',
  imports: [NgClass, CatalogItem, RingSpinnerComponent],
  templateUrl: './catalog-board.html',
  styleUrl: './catalog-board.css'
})
export class CatalogBoard implements OnInit, OnDestroy {

    allParts: Part[] = [];
    filteredParts: Part[] = [];
    categories: { name: string; count: number }[] = [];
    private categoryCounts: Record<string, number> = {};
    selectedCategory: string | null = null;
    currentSearchTerm: string = '';
    itemsPerPage = 6;
    currentPage = 1;
    isLoading = true;
    private categorySubscription?: Subscription;
    private searchSubscription?: Subscription;
    private routeSubscription?: Subscription;

    constructor(
        private partService: PartService,
        private categoryFilterService: CategoryFilterService,
        private searchService: SearchService,
        private route: ActivatedRoute,
        private router: Router
    ) { 
        this.partService.getParts().subscribe({
            next: (parts) => {
                this.allParts = Array.isArray(parts) ? parts : [];
                // build category counts and list
                const counts: Record<string, number> = {};
                for (const part of this.allParts) {
                    const key = (part.category || '').toString().trim();
                    if (!key) continue;
                    counts[key] = (counts[key] || 0) + 1;
                }
                this.categoryCounts = counts;
                this.categories = Object.entries(counts)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                this.applyFilter();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading parts:', error);
                this.isLoading = false;
            }
        });
    }

    ngOnInit(): void {
        // Subscribe to route query parameters for search and category
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            const searchTerm = params['search'] || '';
            const categoryParam = params['category'] || '';
            
            // Handle search parameter
            if (searchTerm) {
                this.currentSearchTerm = searchTerm;
                this.searchService.setSearchTerm(searchTerm);
                // Clear category filter when searching
                this.selectedCategory = null;
                this.categoryFilterService.clearCategory();
            } else {
                this.currentSearchTerm = '';
            }
            
            // Handle category parameter
            if (categoryParam && !searchTerm) {
                this.selectedCategory = categoryParam;
                this.categoryFilterService.setCategory(categoryParam);
                // Clear search when filtering by category
                this.currentSearchTerm = '';
                this.searchService.clearSearchTerm();
            } else if (!categoryParam && !searchTerm) {
                // Clear both filters if no parameters
                this.selectedCategory = null;
                this.currentSearchTerm = '';
                this.categoryFilterService.clearCategory();
                this.searchService.clearSearchTerm();
            }
            
            this.currentPage = 1;
            this.applyFilter();
        });

        // Subscribe to category changes from the slider
        this.categorySubscription = this.categoryFilterService.category$.subscribe(category => {
            this.selectedCategory = category;
            // Clear search when filtering by category
            if (category) {
                this.currentSearchTerm = '';
                this.searchService.clearSearchTerm();
            }
            this.currentPage = 1;
            this.applyFilter();
        });

        // Subscribe to search term changes
        this.searchSubscription = this.searchService.searchTerm$.subscribe(searchTerm => {
            if (searchTerm && searchTerm !== this.currentSearchTerm) {
                this.currentSearchTerm = searchTerm;
                // Clear category filter when searching
                this.selectedCategory = null;
                this.categoryFilterService.clearCategory();
                this.currentPage = 1;
                this.applyFilter();
            } else if (!searchTerm && this.currentSearchTerm) {
                this.currentSearchTerm = '';
                this.currentPage = 1;
                this.applyFilter();
            }
        });
    }

    ngOnDestroy(): void {
        if (this.categorySubscription) {
            this.categorySubscription.unsubscribe();
        }
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }

    get pagedParts(): Part[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredParts.slice(startIndex, startIndex + this.itemsPerPage);
    }

    get totalPages(): number {
        return Math.max(1, Math.ceil(this.filteredParts.length / this.itemsPerPage));
    }

    get pageNumbers(): number[] {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }

    get allCount(): number {
        return this.allParts.length;
    }

    selectCategory(category: string | null): void {
        this.categoryFilterService.setCategory(category);
        // Update URL with category parameter
        if (category) {
            this.router.navigate(['/catalog'], { 
                queryParams: { category: category },
                queryParamsHandling: 'replace'
            });
        } else {
            this.router.navigate(['/catalog'], {
                queryParams: {},
                queryParamsHandling: 'replace'
            });
        }
    }

    isActiveCategory(category: string | null): boolean {
        return (this.selectedCategory ?? null) === (category ?? null);
    }

    get isSearchMode(): boolean {
        return this.currentSearchTerm.trim().length > 0;
    }

    clearSearch(): void {
        this.currentSearchTerm = '';
        this.searchService.clearSearchTerm();
        this.applyFilter();
    }

    applyFilter(): void {
        let results = this.allParts.slice();

        // Apply search filter first
        if (this.currentSearchTerm.trim()) {
            const searchTerm = this.currentSearchTerm.toLowerCase().trim();
            results = results.filter(part => 
                part.title.toLowerCase().includes(searchTerm) ||
                part.description.toLowerCase().includes(searchTerm) ||
                part.category.toLowerCase().includes(searchTerm) ||
                (part.brand && part.brand.toLowerCase().includes(searchTerm))
            );
        }

        // Then apply category filter
        if (this.selectedCategory) {
            results = results.filter(p => (p.category || '').toString() === this.selectedCategory);
        }

        this.filteredParts = results;

        // Ensure current page stays within bounds when data changes
        if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages;
        }
    }

    goToPage(page: number): void {
        if (page < 1 || page > this.totalPages) return;
        this.currentPage = page;
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
        }
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage += 1;
        }
    }

}
