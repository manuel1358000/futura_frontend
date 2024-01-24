// anuncios-shared.service.ts
import { Injectable } from '@angular/core';
import { AnunciosResponse } from '../../models/anuncios/anunciosResponse.models';
import { AnunciosService } from '../anuncios/anuncios.service';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private anunciosMap = new Map<string, AnunciosResponse>();

  constructor(private anunciosService: AnunciosService) {}

  getAnuncios() {
    return this.anunciosService.obtenerAnuncios();
  }

  cargarAnuncios() {
    this.getAnuncios().subscribe({
      next: (data) => {
        data.forEach((anuncio) => {
          this.anunciosMap.set(anuncio.tag, anuncio);
        });
        console.log("this.anunciosMaps",this.anunciosMap);
      },
      error: (error) => {
        console.error('Error al obtener elementos:', error);
      },
    });
  }

  obtenerAnuncioPorTag(tag: string): string | undefined {
    return this.anunciosMap.get(tag)?.urlImage;
  }
  getAnunciosMap(){
    return this.anunciosMap;
  }
}
