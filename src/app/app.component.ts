import { inject, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { ActionPointsComponent } from './action-points/action-points.component';
import { NotesComponent } from './notes/notes.component';
import { MenuService } from './menu/menu.service';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NotesComponent, ActionPointsComponent, LoginComponent, UserComponent, RegisterComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PIPBOY';

  menuService = inject(MenuService);
}
