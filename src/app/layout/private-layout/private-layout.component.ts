import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, FooterComponent],
  templateUrl: './private-layout.component.html',
  styleUrl: './private-layout.component.scss'
})
export class PrivateLayoutComponent {

}
