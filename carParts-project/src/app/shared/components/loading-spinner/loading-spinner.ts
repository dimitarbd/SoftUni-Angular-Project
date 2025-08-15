import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spinner-container" [ngClass]="{'center': center}">
      <div class="spinner" [ngClass]="size">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
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

    .spinner {
      display: inline-block;
      position: relative;
    }

    .spinner.small {
      width: 40px;
      height: 40px;
    }

    .spinner.medium {
      width: 60px;
      height: 60px;
    }

    .spinner.large {
      width: 80px;
      height: 80px;
    }

    .spinner > div {
      width: 18px;
      height: 18px;
      background-color: #fe5c24;
      border-radius: 100%;
      display: inline-block;
      animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    }

    .spinner.small > div {
      width: 12px;
      height: 12px;
    }

    .spinner.large > div {
      width: 24px;
      height: 24px;
    }

    .spinner .bounce1 {
      animation-delay: -0.32s;
    }

    .spinner .bounce2 {
      animation-delay: -0.16s;
    }

    @keyframes sk-bouncedelay {
      0%, 80%, 100% { 
        transform: scale(0);
      } 40% { 
        transform: scale(1.0);
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
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = '';
  @Input() center: boolean = true;
}
