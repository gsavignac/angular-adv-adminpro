import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public total_usuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService ) { 

    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarUsuarios() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  cargarUsuarios(){

    this.cargando = true;
    
    this.usuarioService.cargarUsuarios( this.desde )
        .subscribe( ({ total, usuarios}) => {

          this.total_usuario = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        });

  }

  cambiarPagina( valor: number ){

    this.desde += valor;

    if( this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >= this.total_usuario){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar( termino: string ){

    if( termino.length == 0){ this.usuarios = this.usuariosTemp; return; }
    
     this.busquedasService.buscar('usuarios', termino)
                          .subscribe( resultados => {
                            this.usuarios = resultados;
                          })

  }

  eliminarUsuario( usuario: Usuario ){
    // console.log(usuario);

    if( usuario.uid === this.usuarioService.uid ){
      Swal.fire(
        'Error', 
        'No puede borrar su propio usuario',
        'error'
      );
      return;
    }
    
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario )
        .subscribe( resp => {
          
          this.cargarUsuarios();

          Swal.fire({ 
            title: 'Éxito', 
            text: `Usuario ${ usuario.nombre } fue eliminado correctamente.`, 
            icon: 'success',
            timer: 2000
          });

        });

      }
    })
  }

  cambiarRole( usuario: Usuario){
    
    this.usuarioService.editarUsuario( usuario )
    .subscribe( resp => {
      console.log(resp);
    })

  }

  abrirModal( usuario: Usuario ){
    console.log(usuario.imagenUrl);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.imagenUrl);
  }

}
