import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

    private authService = inject(AuthService);
    private router = inject(Router);

  email = '';
  password = '';
  rememberMe = false;
  error = signal<string>('');

  onSubmit(): void {
    const ok = this.authService.login(this.email, this.password);
    if (ok) {
      this.router.navigateByUrl('/');
    } else {
      this.error.set('Invalid email or password');
    }
  }
}


