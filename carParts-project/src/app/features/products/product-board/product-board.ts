import { Component } from '@angular/core';
import { PartService } from '../../../core/services/part.service';
import { Part } from '../../../models/part.model';
import { ProductItem } from '../product-item/product-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-product-board',
    imports: [ProductItem],
    templateUrl: './product-board.html',
    styleUrl: './product-board.css'
})


export class ProductBoard {

    parts: Part[] = [];

    constructor(private partService: PartService) { }

    ngOnInit(): void {
        this.partService.getParts().pipe(takeUntilDestroyed()).subscribe(parts => this.parts = parts);
    }

}
