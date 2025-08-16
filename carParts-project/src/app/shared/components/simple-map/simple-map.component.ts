import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-simple-map',
  standalone: true,
  template: `
    <div class="simple-map-container" [style.width]="width" [style.height]="height">
      <iframe 
        [src]="mapUrl" 
        [style.width]="width"
        [style.height]="height"
        frameborder="0" 
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>
  `,
  styles: [`
    .simple-map-container {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    iframe {
      border: none;
      display: block;
    }
  `]
})
export class SimpleMapComponent {
  @Input() width: string = '100%';
  @Input() height: string = '400px';
  @Input() location: string = 'Sofia, Bulgaria';
  @Input() zoom: number = 15;

  mapUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapUrl = this.createMapUrl();
  }

  ngOnChanges(): void {
    this.mapUrl = this.createMapUrl();
  }

  private createMapUrl(): SafeResourceUrl {
    const baseUrl = 'https://www.google.com/maps/embed/v1/place';
    const params = new URLSearchParams({
      'q': this.location,
      'zoom': this.zoom.toString()
    });
    
    const url = `${baseUrl}?${params.toString()}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
