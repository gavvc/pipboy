import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MenuService } from '../menu/menu.service';
import { FirestoreService } from '../firestore.service';
import { User } from '../user/user.model';
import { first, from } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  menuService = inject(MenuService);
  fireService = inject(FirestoreService);

  errorMessage = "";
  username = "";
  email = "";
  password = "";

  onSubmit() {
    this.authService
    .register(this.email,this.password, this.username)
    .subscribe({
      next: (user) => {
        console.log('User created: ',user);
        this.fireService.addPlayerAP(user);
        this.menuService.setMenuSelection('PIPBOY');
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

}
