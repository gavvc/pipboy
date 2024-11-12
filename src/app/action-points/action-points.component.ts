import { Component, OnInit, inject, signal } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firestore.service';
import { type ActionPoints } from './action-points.model';
import { ApPlayerComponent } from '../ap-player/ap-player.component';

@Component({
  selector: 'app-action-points',
  standalone: true,
  imports: [ApPlayerComponent],
  templateUrl: './action-points.component.html',
  styleUrl: './action-points.component.css'
})
export class ActionPointsComponent implements OnInit {
  menuService = inject(MenuService);
  authService = inject(AuthService);
  fireService = inject(FirestoreService);

  currentUser$ = this.authService.user$;
  myEmail = "";
  playerAPs = signal<ActionPoints[]>([]);

  async ngOnInit() {
    const user = await this.authService.user$.subscribe({
      next: user => this.myEmail = user?.email || "",}
    );
    if (!user) {
      this.menuService.setMenuSelection('LOGIN');
    }

    //Get Player Data from DB
    return this.fireService.getPlayerAPs().subscribe((playerAPs: ActionPoints[]) => {
      this.playerAPs.set(playerAPs)});


  }

}
