import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';

@Component({
  selector: 'app-catalog-item',
  imports: [],
  templateUrl: './catalog-item.html',
  styleUrl: './catalog-item.css'
})

export class CatalogItem {
    @Input() part!: Part;
}
