import { Component } from '@angular/core';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-product-board',
    imports: [],
    templateUrl: './product-board.html',
    styleUrl: './product-board.css'
})


export class ProductBoard {

    parts: Part[] = [];

    constructor(private partService: PartService) { }

    ngOnInit(): void {
        this.partService.getRecentParts().pipe(takeUntilDestroyed()).subscribe(parts => this.parts = parts);
    }

}
