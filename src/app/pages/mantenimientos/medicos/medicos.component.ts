import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: any[] = [];
  public medicosTemp: any[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private medicosService: MedicoService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService) { 
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarMedicos() );
  }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    
  }

  cargarMedicos(){

    this.cargando = true;

    this.medicosService.cargarMedicos()
    .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
      this.medicosTemp = medicos;
    });

  }

  buscar( termino: string ){

    if( termino.length == 0){ this.medicos = this.medicosTemp; return; }
    
     this.busquedasService.buscar('medicos', termino)
                          .subscribe( resultados => {
                            this.medicos = resultados;
                          })

  }

  abrirModal( medico: any ){
    console.log(medico);

    if( !medico.img ){
      medico.img = `${base_url}/upload/medicos/no-image`;
    }else if( medico.img ){
        medico.img = `${base_url}/upload/medicos/${medico.img}`;
    }else{
        medico.img = `${base_url}/upload/medicos/no-image`;
    }

    this.modalImagenService.abrirModal('medicos', medico.id, medico.img);
  }

  borrarMedicos( medico: any ){

    this.cargando = true;

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicosService.borrarMedicos( medico.id )
        .subscribe( resp => {
          
          this.cargarMedicos();

          Swal.fire({ 
            title: 'Éxito', 
            text: `Médico ${ medico.nombre } fue eliminado correctamente.`, 
            icon: 'success',
            timer: 2000
          });

        });

      }
    })

  }

}
