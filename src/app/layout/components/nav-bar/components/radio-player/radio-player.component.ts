import { Component } from '@angular/core';
import { Howl } from 'howler';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [],
  templateUrl: './radio-player.component.html',
  styleUrl: './radio-player.component.scss'
})
export class RadioPlayerComponent {
  public sound: Howl;

  constructor() {
    this.sound = new Howl({
      src: ['http://186.151.171.157:8000/mystream.mp3'], // Reemplaza con la URL de tu streaming de radio
      format: ['mp3'], // El formato del streaming de radio
      html5: true, // Forzar el uso de HTML5 Audio
      autoplay: true, // Opcional: reproduce automáticamente al iniciar
      preload: true, // Opcional: pre-cargar el audio
      volume: 0.5, // Volumen inicial
    });
  }

  togglePlay() {
    if (this.sound.playing()) {
      this.sound.pause();
    } else {
      this.sound.play();
    }
  }

  ngOnDestroy() {
    this.sound.unload();
  }
}
