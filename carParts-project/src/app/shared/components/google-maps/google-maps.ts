import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './google-maps.html',
  styleUrl: './google-maps.css'
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  
  @Input() width: string = '100%';
  @Input() height: string = '400px';
  @Input() zoom: number = 15;
  @Input() latitude: number = 42.6977; 
  @Input() longitude: number = 23.3219;
  @Input() markerTitle: string = 'Our Location';
  @Input() markerLabel: string = 'A';

  center!: google.maps.LatLngLiteral;
  mapOptions!: google.maps.MapOptions;
  markerOptions!: google.maps.MarkerOptions;

  ngOnInit(): void {
    this.center = { lat: this.latitude, lng: this.longitude };
    
    this.mapOptions = {
      zoom: this.zoom,
      center: this.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true
    };
    
    this.markerOptions = {
      position: this.center,
      title: this.markerTitle,
      animation: google.maps.Animation.DROP
    };
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    // Optional: Handle map click events
    console.log('Map clicked at:', event.latLng?.toJSON());
  }

  onMarkerClick(event: google.maps.MapMouseEvent): void {
    // Optional: Handle marker click events
    console.log('Marker clicked:', this.markerTitle);
  }
}
