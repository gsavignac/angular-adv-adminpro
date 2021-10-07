import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public total_usuario: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();

  }

  cargarUsuarios(){

    this.cargando = true;
    
    this.usuarioService.cargarUsuarios( this.desde )
        .subscribe( ({ total, usuarios}) => {

          this.total_usuario = total;
          this.usuarios = usuarios;
          // console.log(usuarios);
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

}
