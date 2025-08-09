import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './new-product-item.html',
  styleUrl: './new-product-item.css'
})
export class NewProductItem{

    @Input() part!: Part;

}
