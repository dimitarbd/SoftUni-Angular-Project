import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner';
import { RingSpinnerComponent, PulseSpinnerComponent, WaveSpinnerComponent, GearSpinnerComponent, WheelSpinnerComponent } from './spinner-variants';
// import { DualGearSpinnerComponent } from './dual-gear-spinner';

@Component({
  selector: 'app-spinner-demo',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    RingSpinnerComponent,
    PulseSpinnerComponent,
    WaveSpinnerComponent,
    GearSpinnerComponent,
    WheelSpinnerComponent,
    // DualGearSpinnerComponent
  ],
  template: `
    <div class="demo-container">
      <h1>Loading Spinner Variants</h1>
      
      <div class="spinner-section">
        <h2>1. Текущ Bouncing Dots Spinner</h2>
        <div class="spinner-demo">
          <app-loading-spinner size="small" message="Small"></app-loading-spinner>
          <app-loading-spinner size="medium" message="Medium"></app-loading-spinner>
          <app-loading-spinner size="large" message="Large"></app-loading-spinner>
        </div>
      </div>

      <div class="spinner-section">
        <h2>2. Ring Spinner (Rotating Rings)</h2>
        <div class="spinner-demo">
          <app-ring-spinner size="small" message="Small"></app-ring-spinner>
          <app-ring-spinner size="medium" message="Medium"></app-ring-spinner>
          <app-ring-spinner size="large" message="Large"></app-ring-spinner>
        </div>
      </div>

      <div class="spinner-section">
        <h2>3. Pulse Spinner (Pulsing Dots)</h2>
        <div class="spinner-demo">
          <app-pulse-spinner size="small" message="Small"></app-pulse-spinner>
          <app-pulse-spinner size="medium" message="Medium"></app-pulse-spinner>
          <app-pulse-spinner size="large" message="Large"></app-pulse-spinner>
        </div>
      </div>

      <div class="spinner-section">
        <h2>4. Wave Spinner (Audio Bars)</h2>
        <div class="spinner-demo">
          <app-wave-spinner size="small" message="Small"></app-wave-spinner>
          <app-wave-spinner size="medium" message="Medium"></app-wave-spinner>
          <app-wave-spinner size="large" message="Large"></app-wave-spinner>
        </div>
      </div>

      <div class="spinner-section">
        <h2>5. Gear Spinner (Automotive Theme)</h2>
        <div class="spinner-demo">
          <app-gear-spinner size="small" message="Small"></app-gear-spinner>
          <app-gear-spinner size="medium" message="Medium"></app-gear-spinner>
          <app-gear-spinner size="large" message="Large"></app-gear-spinner>
        </div>
      </div>

      <div class="spinner-section">
        <h2>6. Wheel Spinner (Car Wheel Theme)</h2>
        <div class="spinner-demo">
          <app-wheel-spinner size="small" message="Small"></app-wheel-spinner>
          <app-wheel-spinner size="medium" message="Medium"></app-wheel-spinner>
          <app-wheel-spinner size="large" message="Large"></app-wheel-spinner>
        </div>
      </div>

      <div class="spinner-section" style="background: #e8f5e8; border-color: #4caf50;">
        <h2 style="color: #2e7d32;">7. ⭐ Ring Spinner (АКТИВЕН - Сребристо сив)</h2>
        <div class="spinner-demo">
          <app-ring-spinner size="small" message="Small" color="#c0c0c0"></app-ring-spinner>
          <app-ring-spinner size="medium" message="Medium" color="#c0c0c0"></app-ring-spinner>
          <app-ring-spinner size="large" message="Large" color="#c0c0c0"></app-ring-spinner>
        </div>
      </div>

      <div class="instructions">
        <h3>Как да смениш spinner-а:</h3>
        <p>1. Избери кой spinner ти харесва най-много</p>
        <p>2. Замени <code>&lt;app-loading-spinner&gt;</code> с желания компонент:</p>
        <ul>
          <li><code>&lt;app-ring-spinner&gt;</code> - за Ring Spinner</li>
          <li><code>&lt;app-pulse-spinner&gt;</code> - за Pulse Spinner</li>
          <li><code>&lt;app-wave-spinner&gt;</code> - за Wave Spinner</li>
          <li><code>&lt;app-gear-spinner&gt;</code> - за Gear Spinner</li>
          <li><code>&lt;app-wheel-spinner&gt;</code> - за Wheel Spinner</li>
          <li><code>&lt;app-dual-gear-spinner&gt;</code> - за Dual Gear Spinner (АКТИВЕН)</li>
        </ul>
        <p>3. Добави новия компонент в imports на файловете където го използваш</p>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 40px;
      font-size: 2.5rem;
    }

    .spinner-section {
      margin-bottom: 50px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 12px;
      border: 2px solid #e9ecef;
    }

    h2 {
      color: #fe5c24;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .spinner-demo {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-height: 120px;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .instructions {
      background: #e3f2fd;
      padding: 30px;
      border-radius: 12px;
      border-left: 5px solid #2196f3;
    }

    .instructions h3 {
      color: #1976d2;
      margin-bottom: 15px;
    }

    .instructions p {
      margin-bottom: 10px;
      line-height: 1.6;
    }

    .instructions ul {
      margin: 15px 0;
      padding-left: 20px;
    }

    .instructions li {
      margin-bottom: 8px;
      line-height: 1.5;
    }

    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      color: #d32f2f;
    }
  `]
})
export class SpinnerDemoComponent {}
