import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Вариант 1: Rotating Ring Spinner
@Component({
  selector: 'app-ring-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="ring-spinner" [ngClass]="size" [style.--spinner-color]="color">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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

    .ring-spinner {
      display: inline-block;
      position: relative;
    }

    .ring-spinner.small {
      width: 40px;
      height: 40px;
    }

    .ring-spinner.medium {
      width: 64px;
      height: 64px;
    }

    .ring-spinner.large {
      width: 80px;
      height: 80px;
    }

    .ring-spinner {
      --spinner-color: #c0c0c0; /* Default silver grey */
    }

    .ring-spinner div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border: 6px solid var(--spinner-color);
      border-radius: 50%;
      animation: ring-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--spinner-color) transparent transparent transparent;
    }

    .ring-spinner.small div {
      border-width: 4px;
    }

    .ring-spinner.large div {
      border-width: 8px;
    }

    .ring-spinner div:nth-child(1) { animation-delay: -0.45s; }
    .ring-spinner div:nth-child(2) { animation-delay: -0.3s; }
    .ring-spinner div:nth-child(3) { animation-delay: -0.15s; }

    @keyframes ring-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-message {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  `]
})
export class RingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
  @Input() color: string = '#c0c0c0'; // Default silver grey
}

// Вариант 2: Pulsing Dots Spinner
@Component({
  selector: 'app-pulse-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="pulse-spinner" [ngClass]="size">
        <div class="dot1"></div>
        <div class="dot2"></div>
        <div class="dot3"></div>
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

    .pulse-spinner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .pulse-spinner.small {
      width: 40px;
      height: 20px;
    }

    .pulse-spinner.medium {
      width: 60px;
      height: 30px;
    }

    .pulse-spinner.large {
      width: 80px;
      height: 40px;
    }

    .pulse-spinner > div {
      background-color: #fe5c24;
      border-radius: 50%;
      animation: pulse-scale 1.4s ease-in-out infinite both;
    }

    .pulse-spinner.small > div {
      width: 8px;
      height: 8px;
    }

    .pulse-spinner.medium > div {
      width: 12px;
      height: 12px;
    }

    .pulse-spinner.large > div {
      width: 16px;
      height: 16px;
    }

    .pulse-spinner .dot1 {
      animation-delay: -0.32s;
    }

    .pulse-spinner .dot2 {
      animation-delay: -0.16s;
    }

    @keyframes pulse-scale {
      0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }

    .loading-message {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  `]
})
export class PulseSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}

// Вариант 3: Wave Bars Spinner
@Component({
  selector: 'app-wave-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="wave-spinner" [ngClass]="size">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
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

    .wave-spinner {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .wave-spinner.small {
      width: 40px;
      height: 20px;
    }

    .wave-spinner.medium {
      width: 50px;
      height: 30px;
    }

    .wave-spinner.large {
      width: 60px;
      height: 40px;
    }

    .wave-spinner > div {
      background-color: #fe5c24;
      animation: wave-stretch 1.2s ease-in-out infinite;
    }

    .wave-spinner.small > div {
      width: 4px;
    }

    .wave-spinner.medium > div {
      width: 6px;
    }

    .wave-spinner.large > div {
      width: 8px;
    }

    .wave-spinner .bar1 { animation-delay: -1.1s; }
    .wave-spinner .bar2 { animation-delay: -1.0s; }
    .wave-spinner .bar3 { animation-delay: -0.9s; }
    .wave-spinner .bar4 { animation-delay: -0.8s; }
    .wave-spinner .bar5 { animation-delay: -0.7s; }

    @keyframes wave-stretch {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }
      20% {
        transform: scaleY(1.0);
      }
    }

    .loading-message {
      margin-top: 16px;
      color: #666;
      font-size: 14px;
      text-align: center;
    }
  `]
})
export class WaveSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}

// Вариант 4: Gear/Cog Spinner (подходящ за автомобилни части)
@Component({
  selector: 'app-gear-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="gear-spinner" [ngClass]="size">
        <div class="gear">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g fill="#fe5c24">
              <path d="M50,10 L54,18 L62,16 L64,24 L72,24 L72,32 L80,34 L78,42 L86,46 L82,54 L90,58 L84,66 L88,74 L80,76 L82,84 L74,86 L72,94 L64,92 L60,100 L52,96 L48,100 L40,96 L36,100 L28,96 L26,88 L18,90 L16,82 L8,80 L10,72 L2,68 L6,60 L-2,56 L2,48 L-6,44 L-2,36 L6,32 L2,24 L10,22 L8,14 L16,12 L18,4 L26,6 L28,14 L36,12 L40,4 L48,8 L50,10 Z"/>
              <circle cx="50" cy="50" r="15"/>
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
      animation: gear-rotate 2s linear infinite;
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
    }
  `]
})
export class GearSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}

// Вариант 5: Car Wheel Spinner (специално за автомобилни части)
@Component({
  selector: 'app-wheel-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="wheel-spinner" [ngClass]="size">
        <div class="wheel">
          <div class="tire"></div>
          <div class="rim">
            <div class="spoke"></div>
            <div class="spoke"></div>
            <div class="spoke"></div>
            <div class="spoke"></div>
            <div class="spoke"></div>
          </div>
          <div class="center-cap"></div>
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

    .wheel-spinner {
      display: inline-block;
      position: relative;
    }

    .wheel-spinner.small {
      width: 40px;
      height: 40px;
    }

    .wheel-spinner.medium {
      width: 60px;
      height: 60px;
    }

    .wheel-spinner.large {
      width: 80px;
      height: 80px;
    }

    .wheel {
      width: 100%;
      height: 100%;
      position: relative;
      animation: wheel-spin 1.5s linear infinite;
    }

    .tire {
      width: 100%;
      height: 100%;
      border: 6px solid #333;
      border-radius: 50%;
      position: absolute;
    }

    .wheel-spinner.small .tire {
      border-width: 4px;
    }

    .wheel-spinner.large .tire {
      border-width: 8px;
    }

    .rim {
      width: 70%;
      height: 70%;
      background: #fe5c24;
      border-radius: 50%;
      position: absolute;
      top: 15%;
      left: 15%;
    }

    .spoke {
      width: 2px;
      height: 35%;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 0;
      transform-origin: bottom;
      border-radius: 1px;
    }

    .wheel-spinner.small .spoke {
      width: 1px;
    }

    .wheel-spinner.large .spoke {
      width: 3px;
    }

    .spoke:nth-child(1) { transform: translateX(-50%) rotate(0deg); }
    .spoke:nth-child(2) { transform: translateX(-50%) rotate(72deg); }
    .spoke:nth-child(3) { transform: translateX(-50%) rotate(144deg); }
    .spoke:nth-child(4) { transform: translateX(-50%) rotate(216deg); }
    .spoke:nth-child(5) { transform: translateX(-50%) rotate(288deg); }

    .center-cap {
      width: 30%;
      height: 30%;
      background: #333;
      border-radius: 50%;
      position: absolute;
      top: 35%;
      left: 35%;
    }

    @keyframes wheel-spin {
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
    }
  `]
})
export class WheelSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}
