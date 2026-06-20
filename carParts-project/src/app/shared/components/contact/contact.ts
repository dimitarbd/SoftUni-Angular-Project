import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, LeafletMapComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  readonly storeAddress = '69 Bulgaria Blvd, Sofia 1000, Bulgaria';
  readonly storeName = 'Car Parts Store';
  readonly latitude = 42.6647162752686;    
  readonly longitude = 23.288184118883592; 
  readonly mapZoom = 17;
}


