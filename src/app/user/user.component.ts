import { inject, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  MenuService = inject(MenuService);
  authService = inject(AuthService);
  currentUser$ = this.authService.user$;

  myUsername = "";
  myEmail = "";

  async ngOnInit() {
    const user = await this.authService.user$.pipe(first()).toPromise();
    this.myUsername = user?.username || "";
    this.myEmail = user?.email || "";
  }

  onLogout() {
    this.authService.logout()
    .subscribe({
      next: () => {
        // Handle successful logout
        console.log('Logged out successfully');
        this.MenuService.setMenuSelection('PIPBOY');
        // Redirect to login page or other appropriate action
      },
      error: (error) => {
        // Handle logout errors
        console.error('Logout error:', error);
        // Display error message to the user
      }
    });
  }
}
