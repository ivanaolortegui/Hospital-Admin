import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.scss']
})
export class ModalImagenComponent implements OnInit {

  public imagenUpload: any;
  public imgTemp: any = null;

  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.imgTemp = null;
    this.modalImagenService.closeModal();
  }

  changeImage(event: any): void | null {
    const file = event.target.files[0]

    console.log(file);
    this.imagenUpload = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  uploadImagen() {

    const id = this.modalImagenService.id;
    //const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .updatePhoto(this.imagenUpload, id)

      .then(img => {
        // Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

        this.modalImagenService.newImage.emit(img);

        this.closeModal();
        /* 
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      }) */
      })
  }

}
