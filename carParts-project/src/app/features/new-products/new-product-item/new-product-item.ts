import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Part } from '../../../models/part.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-new-product-item',
  imports: [NgFor, RouterLink],
  templateUrl: './new-product-item.html',
  styleUrl: './new-product-item.css'
})
export class NewProductItem{

    @Input() part!: Part;

}
