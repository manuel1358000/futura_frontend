import { Component } from '@angular/core';
import { SharedService } from '../../../../service/shared/shared.service';
import { AnunciosResponse } from '../../../../models/anuncios/anunciosResponse.models';
import { CommonModule } from '@angular/common';
import { AddAnuncioComponent } from './components/add-anuncio/add-anuncio.component';
import { AnunciosService } from '../../../../service/anuncios/anuncios.service';
import { finalize, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [CommonModule, AddAnuncioComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent {
  currentAnuncio: any;
  anunciosArray= new Map<string, AnunciosResponse>();
  constructor(private sharedService: SharedService, private anuncioService: AnunciosService) {}
  
  ngOnInit() {
    this.sharedService.cargarAnuncios();
    console.log("this.sharedService",this.sharedService.getAnunciosMap());
    this.anunciosArray=this.sharedService.getAnunciosMap();
  }
  isFileUploadModalOpen = false;
  uploadedFile: File | null = null;

  openFileUploadModal(anuncio: AnunciosResponse): void {
    console.log("ESTA PASANDO POR AQUI",anuncio);
    this.currentAnuncio=anuncio;
    this.isFileUploadModalOpen = true;
  }

  closeFileUploadModal(): void {
    this.isFileUploadModalOpen = false;
  }

  async handleFileUpload(file: File): Promise<void> {
    // Lógica para manejar el archivo cargado
    this.uploadedFile = file;
    console.log('Archivo cargado:', this.uploadedFile);

    try {
        // Leer el contenido del archivo como base64
        const fileContentBase64 = await this.readFileAsBase64(file);

        // Construir los datos a enviar a la API
        const apiData = {
            fileName: file.name,
            fileContent: fileContentBase64, // Enviar la cadena base64 en lugar del objeto File
            anuncioId: this.currentAnuncio.id
        };
        console.log("apiData", apiData);
        await lastValueFrom(
          this.anuncioService.subirAnuncio(apiData)
              .pipe(
                  finalize(() => {
                      this.closeFileUploadModal();
                      this.sharedService.cargarAnuncios();
                      console.log("this.sharedService", this.sharedService.getAnunciosMap());
                      this.anunciosArray = this.sharedService.getAnunciosMap();
                  })
              )
      ); 

        // Resto del código permanece igual...
    } catch (error) {
        console.error('Error al convertir el archivo a Base64:', error);
        // Manejar el error según tus necesidades
    }
}
private readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}
  
  handleModalClosed(): void {
    // Lógica para manejar el cierre del modal en el componente padre
    this.closeFileUploadModal();
  }

  async fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Error al leer el archivo como Base64.'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  
}
