import { Component } from '@angular/core';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NewProductItem } from '../new-product-item/new-product-item';

@Component({
    standalone: true,
    selector: 'app-new-product-board',
    imports: [NewProductItem],
    templateUrl: './new-product-board.html',
    styleUrl: './new-product-board.css'
})


export class NewProductBoard {

    parts: Part[] = [];

    constructor(private partService: PartService) { }

    ngOnInit(): void {
        this.partService.getRecentParts().pipe(takeUntilDestroyed()).subscribe(parts => this.parts = parts);
    }

}
