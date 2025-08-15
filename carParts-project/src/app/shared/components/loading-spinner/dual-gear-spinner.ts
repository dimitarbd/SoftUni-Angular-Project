import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dual-gear-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="dual-gear-spinner" [ngClass]="size">
        <div class="gears-wrapper">
          <!-- Първо зъбно колело (по-голямо, ляво) -->
          <div class="gear gear-large">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Големи зъбци като на снимката -->
              <g fill="none" stroke="#9e9e9e" stroke-width="2.5">
                <!-- 8 големи зъба -->
                <rect x="44" y="5" width="12" height="18" stroke-width="2"/>
                <rect x="77" y="44" width="18" height="12" stroke-width="2"/>
                <rect x="44" y="77" width="12" height="18" stroke-width="2"/>
                <rect x="5" y="44" width="18" height="12" stroke-width="2"/>
                <!-- Диагонални големи зъби -->
                <rect x="67" y="12" width="12" height="18" stroke-width="2" transform="rotate(45 73 21)"/>
                <rect x="70" y="67" width="12" height="18" stroke-width="2" transform="rotate(135 76 76)"/>
                <rect x="21" y="70" width="12" height="18" stroke-width="2" transform="rotate(225 27 79)"/>
                <rect x="12" y="21" width="12" height="18" stroke-width="2" transform="rotate(315 18 30)"/>
              </g>
              
              <!-- Основен кръг - само контур -->
              <circle cx="50" cy="50" r="38" fill="none" stroke="#9e9e9e" stroke-width="2.5"/>
              
              <!-- Централна дупка -->
              <circle cx="50" cy="50" r="12" fill="none" stroke="#9e9e9e" stroke-width="2"/>
              
              <!-- Кръгли дупки вътре -->
              <circle cx="50" cy="30" r="3" fill="none" stroke="#9e9e9e" stroke-width="1.5"/>
              <circle cx="70" cy="50" r="3" fill="none" stroke="#9e9e9e" stroke-width="1.5"/>
              <circle cx="50" cy="70" r="3" fill="none" stroke="#9e9e9e" stroke-width="1.5"/>
              <circle cx="30" cy="50" r="3" fill="none" stroke="#9e9e9e" stroke-width="1.5"/>
              <circle cx="65" cy="35" r="2" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="65" cy="65" r="2" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="35" cy="65" r="2" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="35" cy="35" r="2" fill="none" stroke="#9e9e9e" stroke-width="1"/>
            </svg>
          </div>
          
          <!-- Второ зъбно колело (по-малко, дясно, застъпващо се) -->
          <div class="gear gear-small">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <!-- Големи зъбци като на снимката (6 зъба) -->
              <g fill="none" stroke="#9e9e9e" stroke-width="2">
                <!-- 6 големи зъба на равни разстояния -->
                <rect x="43" y="8" width="14" height="15" stroke-width="1.5"/>
                <rect x="70" y="28" width="14" height="15" stroke-width="1.5" transform="rotate(60 77 35.5)"/>
                <rect x="70" y="57" width="14" height="15" stroke-width="1.5" transform="rotate(120 77 64.5)"/>
                <rect x="43" y="77" width="14" height="15" stroke-width="1.5" transform="rotate(180 50 84.5)"/>
                <rect x="16" y="57" width="14" height="15" stroke-width="1.5" transform="rotate(240 23 64.5)"/>
                <rect x="16" y="28" width="14" height="15" stroke-width="1.5" transform="rotate(300 23 35.5)"/>
              </g>
              
              <!-- Основен кръг - само контур -->
              <circle cx="50" cy="50" r="30" fill="none" stroke="#9e9e9e" stroke-width="2"/>
              
              <!-- Централна дупка -->
              <circle cx="50" cy="50" r="10" fill="none" stroke="#9e9e9e" stroke-width="1.5"/>
              
              <!-- Кръгли дупки вътре -->
              <circle cx="50" cy="32" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="63" cy="43" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="63" cy="57" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="50" cy="68" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="37" cy="57" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
              <circle cx="37" cy="43" r="2.5" fill="none" stroke="#9e9e9e" stroke-width="1"/>
            </svg>
          </div>
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

    .dual-gear-spinner {
      display: inline-block;
      position: relative;
    }

    .dual-gear-spinner.small {
      width: 140px;
      height: 100px;
    }

    .dual-gear-spinner.medium {
      width: 180px;
      height: 130px;
    }

    .dual-gear-spinner.large {
      width: 220px;
      height: 160px;
    }

    .gears-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .gear {
      position: absolute;
      filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.15));
    }

    .gear svg {
      width: 100%;
      height: 100%;
    }

    /* Позициониране на голямото зъбно колело (ляво) */
    .gear-large {
      top: 5%;
      left: -20%;
      width: 85%;
      height: 90%;
      animation: gear-rotate-clockwise 4s linear infinite;
      z-index: 1;
    }

    /* Позициониране на малкото зъбно колело (дясно, много близо застъпващо се) */
    .gear-small {
      top: 25%;
      right: -25%;
      width: 75%;
      height: 80%;
      animation: gear-rotate-counter-clockwise 3s linear infinite;
      z-index: 2;
    }

    /* Анимации - противоположни посоки */
    @keyframes gear-rotate-clockwise {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes gear-rotate-counter-clockwise {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(-360deg);
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
      filter: drop-shadow(2px 2px 5px rgba(0,0,0,0.3));
    }

    .dual-gear-spinner:hover .gear-large {
      animation-duration: 1.5s;
    }

    .dual-gear-spinner:hover .gear-small {
      animation-duration: 1.25s;
    }

    /* Responsive адаптации */
    .dual-gear-spinner.small .gear-large {
      width: 70%;
      height: 70%;
    }

    .dual-gear-spinner.small .gear-small {
      width: 45%;
      height: 45%;
    }

    .dual-gear-spinner.large .gear-large {
      width: 60%;
      height: 60%;
    }

    .dual-gear-spinner.large .gear-small {
      width: 55%;
      height: 55%;
    }
  `]
})
export class DualGearSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}
