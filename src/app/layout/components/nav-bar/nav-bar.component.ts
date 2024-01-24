import { Component, OnInit } from '@angular/core';
import { RadioPlayerComponent } from './components/radio-player/radio-player.component';
import { AnunciosApiResponse, AnunciosResponse } from '../../../models/anuncios/anunciosResponse.models';
import { AnunciosService } from '../../../service/anuncios/anuncios.service';
import { SharedService } from '../../../service/shared/shared.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RadioPlayerComponent, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private sharedService: SharedService, private authService: AuthService,private router: Router) {
    this.loggedIn = this.authService.isAuthenticated();
  }

  ngOnInit() {
    this.sharedService.cargarAnuncios();
  }

  obtenerAnuncioPorTag(tag: string): string | undefined {
    return this.sharedService.obtenerAnuncioPorTag(tag);
  }

  toggleSession() {
    if (this.loggedIn) {
      // Realizar lógica de cierre de sesión si es necesario.
      // Por ejemplo, eliminar el token de autenticación o realizar cualquier acción necesaria.
      // Después, redirigir al usuario a la página de inicio.
      this.authService.logout();  // Ajusta el método de cierre de sesión según tu implementación.
      this.router.navigate(['/']);
      this.loggedIn=false;
    } else {
      // Redirigir al usuario a la página de inicio de sesión.
      this.router.navigate(['/sign-in']);
    }
  }

}
