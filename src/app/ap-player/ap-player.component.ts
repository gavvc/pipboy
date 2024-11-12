import { Component, Input } from '@angular/core';
import { ActionPoints } from '../action-points/action-points.model';

@Component({
  selector: 'app-ap-player',
  standalone: true,
  imports: [],
  templateUrl: './ap-player.component.html',
  styleUrl: './ap-player.component.css'
})
export class ApPlayerComponent {
  @Input({required:true}) playerAP!: ActionPoints;

}
