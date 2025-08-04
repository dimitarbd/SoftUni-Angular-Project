import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem{

    @Input() part!: Part;

}
