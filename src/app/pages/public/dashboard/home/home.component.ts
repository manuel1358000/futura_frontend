import { Component } from '@angular/core';
import { AnunciosResponse } from '../../../../models/anuncios/anunciosResponse.models';
import { AnunciosService } from '../../../../service/anuncios/anuncios.service';
import { SharedService } from '../../../../service/shared/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.cargarAnuncios();
  }

  obtenerAnuncioPorTag(tag: string): string | undefined {
    return this.sharedService.obtenerAnuncioPorTag(tag);
  }
}
