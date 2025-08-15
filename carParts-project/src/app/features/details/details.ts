import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PartService } from '../../core/services/part.service';
import { Part } from '../../models/part.model';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommentsService } from '../../core/services/comments.service';
import { RingSpinnerComponent } from '../../shared/components/loading-spinner/spinner-variants';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, RingSpinnerComponent],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class DetailsComponent {
    protected authService = inject(AuthService);
    private router = inject(Router);
    part?: Part;
    partId = '';
    comments: any[] = [];
    isLoadingComments = true;
    isLoadingPart = true;
    text = '';
    rating: number = 1;
    stars: number[] = [0, 1, 2, 3, 4];

    constructor(
        private route: ActivatedRoute,
        private partService: PartService,
        private commentsService: CommentsService
    ) {
        this.partId = this.route.snapshot.paramMap.get('id') ?? '';
        if (!this.partId) {
            this.router.navigateByUrl('/catalog');
            return;
        }
        this.partService.getOne(this.partId).subscribe({
            next: (part) => {
                this.part = part;
                this.isLoadingPart = false;
            },
            error: (error) => {
                console.error('Error loading part:', error);
                this.isLoadingPart = false;
                this.router.navigateByUrl('/catalog');
            }
        });
        this.loadComments();
    }

    get isAuthenticated(): boolean {
        return this.authService.isLoggedIn();
    }

    get isOwner(): boolean {
        const userId = this.authService.getCurrentUserId();
        return !!userId && (this.part as any)?._ownerId === userId;
    }

    deletePart(): void {
        if (!confirm('Are you sure you want to delete this part?')) return;
        this.partService.deletePart(this.partId).subscribe(() => this.router.navigateByUrl('/catalog'));
    }

    loadComments(): void {
        this.isLoadingComments = true;
        this.commentsService.getAllByPart(this.partId).subscribe({
            next: (res) => { this.comments = res; this.isLoadingComments = false; },
            error: () => { this.isLoadingComments = false; }
        });
    }

    submitComment(): void {
        if (!this.isAuthenticated) return;
        const currentDate = new Date().toLocaleDateString('en-GB').split('/').map((p, i) => i === 2 ? p.slice(-2) : p).join('/');
        this.commentsService.create(this.partId, this.text, Number(this.rating), currentDate).subscribe({
            next: () => { this.text = ''; this.rating = 1; this.loadComments(); },
            error: () => { }
        });
    }

    deleteComment(commentId: string): void {
        this.commentsService.delete(commentId).subscribe({ next: () => this.loadComments() });
    }

    isSilver(index: number, rating: any): boolean {
        const numericRating = typeof rating === 'string' ? parseInt(rating, 10) : Number(rating ?? 0);
        const safe = Number.isFinite(numericRating) ? Math.max(0, Math.min(5, Math.floor(numericRating))) : 0;
        return (index + 1) > safe;
    }
}


