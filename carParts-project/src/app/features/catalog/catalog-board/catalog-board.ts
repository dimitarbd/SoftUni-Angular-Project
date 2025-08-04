import { Component } from '@angular/core';
import { Part } from '../../../models/part.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PartService } from '../../../core/services/part.service';

@Component({
  selector: 'app-catalog-board',
  imports: [],
  templateUrl: './catalog-board.html',
  styleUrl: './catalog-board.css'
})
export class CatalogBoard {

    parts: Part[] = [];

    constructor(private partService: PartService) { }

    ngOnInit(): void {
        this.partService.getParts().pipe(takeUntilDestroyed()).subscribe(parts => this.parts = parts);
    }
}
