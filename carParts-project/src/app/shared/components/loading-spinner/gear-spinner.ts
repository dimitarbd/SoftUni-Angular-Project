import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gear-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="gear-spinner" [ngClass]="size">
        <div class="gear">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Зъбите на колелото -->
            <g fill="#404040">
              <!-- Основен кръг -->
              <circle cx="50" cy="50" r="40" />
              
              <!-- Зъби (16 зъба за гладка окръжност) -->
              <g>
                <rect x="48" y="8" width="4" height="8" rx="1"/>
                <rect x="48" y="84" width="4" height="8" rx="1"/>
                <rect x="8" y="48" width="8" height="4" rx="1"/>
                <rect x="84" y="48" width="8" height="4" rx="1"/>
                
                <!-- Диагонални зъби -->
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(22.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(45 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(67.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(90 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(112.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(135 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(157.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(180 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(202.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(225 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(247.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(270 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(292.5 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(315 50 50)"/>
                <rect x="48" y="8" width="4" height="8" rx="1" transform="rotate(337.5 50 50)"/>
              </g>
              
              <!-- Централна дупка -->
              <circle cx="50" cy="50" r="12" fill="#2a2a2a"/>
              
              <!-- Вътрешен кръг за детайл -->
              <circle cx="50" cy="50" r="25" fill="none" stroke="#2a2a2a" stroke-width="2"/>
              
              <!-- Малки дупки за декорация -->
              <circle cx="50" cy="30" r="2" fill="#2a2a2a"/>
              <circle cx="70" cy="50" r="2" fill="#2a2a2a"/>
              <circle cx="50" cy="70" r="2" fill="#2a2a2a"/>
              <circle cx="30" cy="50" r="2" fill="#2a2a2a"/>
            </g>
          </svg>
        </div>
      </div>
      <p *ngIf="message" class="loading-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .spinner-container.center {
      min-height: 200px;
    }

    .gear-spinner {
      display: inline-block;
      position: relative;
    }

    .gear-spinner.small {
      width: 40px;
      height: 40px;
    }

    .gear-spinner.medium {
      width: 60px;
      height: 60px;
    }

    .gear-spinner.large {
      width: 80px;
      height: 80px;
    }

    .gear {
      width: 100%;
      height: 100%;
      animation: gear-rotate 3s linear infinite;
      filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    }

    .gear svg {
      width: 100%;
      height: 100%;
    }

    @keyframes gear-rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .loading-message {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
      text-align: center;
      font-weight: 500;
    }

    /* Hover ефект за интерактивност */
    .gear:hover {
      animation-duration: 1s;
      filter: drop-shadow(2px 2px 6px rgba(0,0,0,0.4));
    }
  `]
})
export class GearSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}
