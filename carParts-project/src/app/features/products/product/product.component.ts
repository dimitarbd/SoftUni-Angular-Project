import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductItem{

    @Input() part!: Part;

}
