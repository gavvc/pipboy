import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { AuthService } from '../auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuService = inject(MenuService);
  authService = inject(AuthService);

  currentUser$ = this.authService.user$;
  myEmail = "";

  async ngOnInit() {
    const user = await this.authService.user$.subscribe({
      next: user => this.myEmail = user?.email || "",}
    );
    if (!user) {
      this.menuService.setMenuSelection('LOGIN');
    }
  }

  onLoginSelected() {
    this.menuService.setMenuSelection('LOGIN');
  }

  onPipboySelected() {
    this.menuService.setMenuSelection('PIPBOY');
  }

  onNotesSelected() {
    this.menuService.setMenuSelection('NOTES');
  }

  onUserSelected() {
    this.menuService.setMenuSelection('USER');
  }
}
