import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CatalogItem } from '../catalog-item/catalog-item';
import { Part } from '../../../models/part.model';
import { PartService } from '../../../core/services/part.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-catalog-board',
  imports: [AsyncPipe, CatalogItem],
  templateUrl: './catalog-board.html',
  styleUrl: './catalog-board.css'
})
export class CatalogBoard {

    parts$: Observable<Part[]>;

    constructor(private partService: PartService) { 
        this.parts$ = this.partService.getParts();
    }

}
