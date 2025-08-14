import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CatalogItem } from '../catalog-item/catalog-item';
import { Part } from '../../../models/part.model';
import { PartService } from '../../../core/services/part.service';

@Component({
  standalone: true,
  selector: 'app-catalog-board',
  imports: [NgClass, CatalogItem],
  templateUrl: './catalog-board.html',
  styleUrl: './catalog-board.css'
})
export class CatalogBoard {

    allParts: Part[] = [];
    filteredParts: Part[] = [];
    categories: { name: string; count: number }[] = [];
    private categoryCounts: Record<string, number> = {};
    selectedCategory: string | null = null;
    itemsPerPage = 6;
    currentPage = 1;

    constructor(private partService: PartService) { 
        this.partService.getParts().subscribe(parts => {
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
        });
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
        this.selectedCategory = category;
        this.currentPage = 1;
        this.applyFilter();
    }

    isActiveCategory(category: string | null): boolean {
        return (this.selectedCategory ?? null) === (category ?? null);
    }

    applyFilter(): void {
        if (!this.selectedCategory) {
            this.filteredParts = this.allParts.slice();
        } else {
            this.filteredParts = this.allParts.filter(p => (p.category || '').toString() === this.selectedCategory);
        }
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
