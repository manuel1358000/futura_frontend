import { Component } from '@angular/core';
import { RadioPlayerComponent } from './components/radio-player/radio-player.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RadioPlayerComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}
