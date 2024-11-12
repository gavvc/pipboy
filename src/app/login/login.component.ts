import { inject, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  MenuService = inject(MenuService);

  currentUser$ = this.authService.user$;

  email= '';
  password = '';
  errorMessage: string | null = null;

  onSubmit():void {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          this.MenuService.setMenuSelection('PIPBOY');
          // Successful login, navigate to the desired page
          // Replace '/home' with your desired route
        },
        error: (error) => {
          // Handle login errors
          console.error('Login error:', error);
          // Display error message to the user
          this.errorMessage = error;
        }
      });
  }

  onRegister() {
    this.MenuService.setMenuSelection('REGISTER');
  }

}
