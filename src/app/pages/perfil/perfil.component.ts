import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: any;
  public usuario: Usuario;
  public imagenSubir: any;
  public imgTmp: any;

  constructor( private fb: FormBuilder, private usuariosService: UsuarioService, private fileUpload: FileUploadService) { 

    this.usuario = usuariosService.usuario;

  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, Validators.required]
    });

  }

  actualizarPerfil(){
    // console.log( this.perfilForm.value );
    this.usuariosService.actualizarPerfil( this.perfilForm.value ).subscribe( resp => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire({ 
        title: 'Éxito', 
        text: 'Se actualizaron los datos correctamente', 
        icon: 'success',
        timer: 2000
      });

    }, (err) => {
      Swal.fire({ 
        title: 'Error', 
        text: err.error.msg, 
        icon: 'error',
        timer: 2000
      });
    });
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

    this.fileUpload.actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid || '' )
    .then( img => {
      this.usuario.img = img;
      Swal.fire({ 
        title: 'Éxito', 
        text: "Imágen de usuario actualizada.", 
        icon: 'success',
        timer: 2000
      });
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
