import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal<string>('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const ok = this.authService.login(this.email, this.password);
    if (ok) {
      this.router.navigateByUrl('/');
    } else {
      this.error.set('Invalid email or password');
    }
  }
}


