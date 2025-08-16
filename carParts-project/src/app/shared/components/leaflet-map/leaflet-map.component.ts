import { Component, OnInit, OnDestroy, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaflet-map-container">
      <div #mapContainer class="map-container" [style.height]="height" [style.width]="width"></div>
    </div>
  `,
  styles: [`
    .leaflet-map-container {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: box-shadow 0.3s ease;
    }
    
    .leaflet-map-container:hover {
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }
    
    .map-container {
      z-index: 1;
    }
    
    /* Fix for missing marker icons */
    :host ::ng-deep .leaflet-marker-icon {
      margin-left: -12px !important;
      margin-top: -41px !important;
    }
    
    :host ::ng-deep .leaflet-div-icon {
      background: transparent;
      border: none;
    }
  `]
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() width: string = '100%';
  @Input() height: string = '400px';
  @Input() latitude: number = 42.6951;
  @Input() longitude: number = 23.3202;
  @Input() zoom: number = 17;
  @Input() markerTitle: string = 'Our Location';
  @Input() address: string = '69 Bulgaria Blvd, Sofia 1000, Bulgaria';

  private map!: L.Map;
  private marker!: L.Marker;

  ngOnInit(): void {
    // Fix for missing marker icons in Angular
    this.fixLeafletIcons();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    this.addMarker();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private fixLeafletIcons(): void {
    // Fix for default marker icons not showing up
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  private initializeMap(): void {
    // Initialize the map
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.latitude, this.longitude],
      zoom: this.zoom,
      zoomControl: true,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      dragging: true
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(this.map);
  }

  private addMarker(): void {
    // Add a marker at the specified location
    this.marker = L.marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup(`
        <div style="text-align: center; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #333;">${this.markerTitle}</h4>
          <p style="margin: 0; color: #666; font-size: 14px;">${this.address}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${this.latitude},${this.longitude}" 
             target="_blank" 
             style="color: #007bff; text-decoration: none; font-size: 14px;">
            Get Directions
          </a>
        </div>
      `)
      .openPopup();
  }
}
