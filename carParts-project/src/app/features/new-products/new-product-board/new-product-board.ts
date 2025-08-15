import { Component, DestroyRef, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewProductItem } from '../new-product-item/new-product-item';
import { RingSpinnerComponent } from '../../../shared/components/loading-spinner/spinner-variants';

@Component({
    standalone: true,
    selector: 'app-new-product-board',
    imports: [NgFor, NewProductItem, RingSpinnerComponent],
    templateUrl: './new-product-board.html',
    styleUrl: './new-product-board.css'
})
export class NewProductBoard implements OnInit, AfterViewInit {

    @ViewChild('productsContainer', { static: false }) productsContainer!: ElementRef;
    parts: Part[] = [];
    displayParts: Part[] = [];
    isLoading = true;
    private scrollTimeout: any;

    constructor(private partService: PartService, private destroyRef: DestroyRef) { }

    ngOnInit(): void {
        this.partService.getRecentParts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (parts) => {
                this.parts = parts;
                this.createInfiniteLoop();
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading recent parts:', error);
                this.isLoading = false;
            }
        });
    }

    ngAfterViewInit(): void {
        // Add scroll listener for infinite effect even on manual scroll
        if (this.productsContainer) {
            this.productsContainer.nativeElement.addEventListener('scroll', () => {
                clearTimeout(this.scrollTimeout);
                this.scrollTimeout = setTimeout(() => {
                    this.checkAndRepositionScroll();
                }, 2000); // Wait longer before repositioning to avoid interrupting user scrolling
            });
        }
    }

    private createInfiniteLoop(): void {
        if (this.parts.length > 0) {
            // Create a much longer loop for truly seamless infinite scrolling
            const repeatCount = 20; // Many repetitions to avoid visible repositioning
            this.displayParts = [];
            
            for (let i = 0; i < repeatCount; i++) {
                this.displayParts.push(...this.parts);
            }
            
            // Set initial scroll position to well into the middle, but only after styles are loaded
            const setInitialPosition = () => {
                if (!this.productsContainer) return;
                const container = this.productsContainer.nativeElement;
                const itemWidth = this.getItemWidth();
                container.scrollLeft = itemWidth * this.parts.length * 10; // Start from the middle
            };

            if (document.readyState === 'complete') {
                // Double rAF to ensure layout/styles are fully applied before measuring
                requestAnimationFrame(() => requestAnimationFrame(setInitialPosition));
            } else {
                window.addEventListener('load', () => {
                    requestAnimationFrame(() => requestAnimationFrame(setInitialPosition));
                }, { once: true });
            }
        }
    }

    private getItemWidth(): number {
        if (!this.productsContainer) return 300;
        const container = this.productsContainer.nativeElement;
        const containerWidth = container.clientWidth;
        
        if (containerWidth > 1501) return containerWidth / 6;
        else if (containerWidth > 1200) return containerWidth / 4;
        else if (containerWidth > 992) return containerWidth / 3;
        else if (containerWidth > 767) return containerWidth / 2;
        else return containerWidth;
    }

    scrollLeft(): void {
        if (this.productsContainer && this.parts.length > 0) {
            const container = this.productsContainer.nativeElement;
            const scrollAmount = this.getScrollAmount();
            
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    scrollRight(): void {
        if (this.productsContainer && this.parts.length > 0) {
            const container = this.productsContainer.nativeElement;
            const scrollAmount = this.getScrollAmount();
            
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    private checkAndRepositionScroll(): void {
        if (!this.productsContainer || this.parts.length === 0) return;
        
        const container = this.productsContainer.nativeElement;
        const itemWidth = this.getItemWidth();
        const singleSetWidth = itemWidth * this.parts.length;
        const currentScroll = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // Only reposition if we're very close to the extreme ends
        // This prevents visible jumps during normal scrolling
        
        // If we're very close to the beginning (first 2 sets)
        if (currentScroll < singleSetWidth * 2) {
            // Smoothly move to equivalent position further in
            const targetPosition = currentScroll + singleSetWidth * 8;
            if (targetPosition <= maxScroll) {
                container.scrollLeft = targetPosition;
            }
        }
        // If we're very close to the end (last 2 sets)
        else if (currentScroll > maxScroll - singleSetWidth * 2) {
            // Smoothly move to equivalent position further back
            const targetPosition = currentScroll - singleSetWidth * 8;
            if (targetPosition >= 0) {
                container.scrollLeft = targetPosition;
            }
        }
    }

    trackByPartId(index: number, part: Part): string {
        return part._id + '_' + index; // Unique identifier for each item including duplicates
    }

    private getScrollAmount(): number {
        if (!this.productsContainer) return 300;
        
        const container = this.productsContainer.nativeElement;
        const containerWidth = container.clientWidth;
        
        // Scroll by approximately one item width based on screen size
        if (containerWidth > 1501) {
            return containerWidth / 6; // 6 items visible
        } else if (containerWidth > 1200) {
            return containerWidth / 4; // 4 items visible
        } else if (containerWidth > 992) {
            return containerWidth / 3; // 3 items visible
        } else if (containerWidth > 767) {
            return containerWidth / 2; // 2 items visible
        } else {
            return containerWidth; // 1 item visible
        }
    }

}
