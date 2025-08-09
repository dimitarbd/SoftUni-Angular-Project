import { Component, Input } from '@angular/core';
import { Part } from '../../../models/part.model';

@Component({
  standalone: true,
  selector: 'app-new-product-item',
  imports: [],
  templateUrl: './new-product-item.html',
  styleUrl: './new-product-item.css'
})
export class NewProductItem{

    @Input() part!: Part;

}
