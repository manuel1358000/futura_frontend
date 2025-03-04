import { AnunciosResponse } from '../../../../models/anuncios/anunciosResponse.models';
import { AnunciosService } from '../../../../service/anuncios/anuncios.service';
import { SharedService } from '../../../../service/shared/shared.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private sharedService: SharedService,private http: HttpClient) {}
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  private audioUrl = 'https://70a4-186-151-171-157.ngrok-free.app/mystream.mp3';

  ngOnInit() {
    this.sharedService.cargarAnuncios();
    this.loadAudio();
  }

  private async loadAudio() {
    try {
      const response = await fetch(this.audioUrl, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (!response.ok) throw new Error('Error al cargar el audio');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      this.audioPlayer.nativeElement.src = objectUrl;
      this.audioPlayer.nativeElement.play();
    } catch (error) {
      console.error('Error al reproducir el audio:', error);
    }
  }

  obtenerAnuncioPorTag(tag: string): string | undefined {
    return this.sharedService.obtenerAnuncioPorTag(tag);
  }
}
