import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-anuncio',
  standalone: true,
  imports: [],
  templateUrl: './add-anuncio.component.html',
  styleUrl: './add-anuncio.component.scss'
})
export class AddAnuncioComponent {
  @Output() fileUploaded = new EventEmitter<File>();
  @Output() modalClosed = new EventEmitter<void>();

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // Obtener el primer archivo del input
      this.selectedFile = inputElement.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      // Aquí puedes llamar a un servicio para subir el archivo
      // por ejemplo: this.fileUploadService.uploadFile(this.selectedFile);
      this.fileUploaded.emit(this.selectedFile);
      this.closeModal();
    }
  }
  closeModal(): void {
    // Lógica para cerrar el modal (puede emitir un evento para que el componente padre lo maneje)
    this.modalClosed.emit();
    
  }
}
