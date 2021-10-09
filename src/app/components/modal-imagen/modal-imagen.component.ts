import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: any;
  public imgTmp: any;
  
  constructor( public modalImagenService: ModalImagenService, public fileUpload: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTmp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen( event: any ) {

    this.imagenSubir = event.target.files[0];

    if( !this.imagenSubir ){ 
      this.imgTmp = null; 
      return this.imgTmp;
    }

    const reader = new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend = () => {
      this.imgTmp = reader.result;
    }

  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUpload.actualizarFoto( this.imagenSubir, tipo, id || '' )
    .then( img => {
      Swal.fire({ 
        title: 'Éxito', 
        text: "Imágen actualizada.", 
        icon: 'success',
        timer: 2000
      });

      this.modalImagenService.nuevaImagen.emit(img);

      this.cerrarModal();
    } )
    .catch( (err) => {
      Swal.fire({ 
        title: 'Error', 
        text: "No se pudo actualizar la imágen.", 
        icon: 'error',
        timer: 2000
      });
    } );

  }

}
