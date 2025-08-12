import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  repassword = '';
  error = signal<string>('');

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.password !== this.repassword) {
      this.error.set('Passwords do not match!');
      return;
    }
    const ok = this.authService.register(this.email, this.password, this.repassword);
    if (ok) {
      this.router.navigateByUrl('/');
    } else {
      this.error.set('Registration failed');
    }
  }
}


