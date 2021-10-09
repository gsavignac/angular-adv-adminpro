import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: any[] = [];
  public hospitalesTemp: any[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor( private hospitalesService: HospitalService, private modalImagenService: ModalImagenService, private busquedasService: BusquedasService ) { 
    this.imgSubs = this.modalImagenService.nuevaImagen
        .pipe( delay(100) )
        .subscribe( img => this.cargarHospitales() );
  }

  ngOnInit(): void {

    this.cargarHospitales();

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalesService.cargarHospitales()
    .subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      this.hospitalesTemp = hospitales;
    });

  }

  guardarCambios( hospital: any ){

    this.cargando = true;

    this.hospitalesService.actualizarHospitales(hospital.id, hospital.nombre)
    .subscribe( resp => {

      this.cargando = false;
      Swal.fire({ 
        title: 'Éxito', 
        text: `Hospital actualizado correctamente.`, 
        icon: 'success',
        timer: 2000
      });

      this.cargarHospitales();
    })

  }

  borrarHospital( hospital:any ){

    this.cargando = true;

    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Esta a punto de borrar a ${ hospital.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalesService.borrarHospitales( hospital.id )
        .subscribe( resp => {
          
          this.cargarHospitales();

          Swal.fire({ 
            title: 'Éxito', 
            text: `Hospital ${ hospital.nombre } fue eliminado correctamente.`, 
            icon: 'success',
            timer: 2000
          });

        });

      }
    })

  }


  async crarHospital(){

    const { value = '' } = await Swal.fire<string>({

      title: 'Nuevo Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      icon: 'info',
      confirmButtonText: 'Guardar cambios',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'

    });

    if( value?.trim().length > 0 ){
      
      this.hospitalesService.crearHospitales( value )
      .subscribe( (resp: any) => {
        
        // this.hospitales.push( resp.hospitales );
        this.cargarHospitales()

        Swal.fire({ 
          title: 'Éxito', 
          text: `Hospital ${ value } registrado correctamente.`, 
          icon: 'success',
          timer: 2000
        });
      })

    }

  }

  abrirModal( hospital: any ){
    console.log(hospital);

    if( !hospital.img ){
      hospital.img = `${base_url}/upload/hospitales/no-image`;
    }else if( hospital.img ){
        hospital.img = `${base_url}/upload/hospitales/${hospital.img}`;
    }else{
        hospital.img = `${base_url}/upload/hospitales/no-image`;
    }

    this.modalImagenService.abrirModal('hospitales', hospital.id, hospital.img);
  }


  buscar( termino: string ){

    if( termino.length == 0){ this.hospitales = this.hospitalesTemp; return; }
    
     this.busquedasService.buscar('hospitales', termino)
                          .subscribe( resultados => {
                            this.hospitales = resultados;
                          })

  }

}
