import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup = this.fb.group({
    nombre: [ '' , Validators.required], 
    hospital: [ '' , Validators.required]
  });

  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: any;

  public medicoSeleccionado: any;

  constructor(private fb: FormBuilder, 
              private hospitalServices: HospitalService, 
              private medicoService: MedicoService, 
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.getMedicoSeleccionado( params.id );
    })
    
    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
    .subscribe( id_hospital => {
        
        this.hospitalSeleccionado = this.hospitales.find( h => h.id === id_hospital);

    })

  }

  cargarHospitales(){
    this.hospitalServices.cargarHospitales()
    .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      // console.log(hospitales)
    })
  }

  guardarMedico(){

    if( this.medicoSeleccionado ){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        id: this.medicoSeleccionado.id
      }
      this.medicoService.actualizarMedicos( data )
      .subscribe( (resp: any) => {

        Swal.fire({ 
          title: 'Éxito', 
          text: `Médico actualizado correctamente.`, 
          icon: 'success',
          timer: 2000
        });

        // this.router.navigateByUrl(`/dashboard/medico/${resp.medico.id}`);

      })      

    }else{
      // crear
      this.medicoService.crearMedicos( this.medicoForm.value )
      .subscribe( (resp: any) => {
        
        Swal.fire({ 
          title: 'Éxito', 
          text: `Médico registrado correctamente.`, 
          icon: 'success',
          timer: 2000
        });

        this.router.navigateByUrl(`/dashboard/medico/${resp.medico.id}`);
        
      } )

    }
    
  }

  getMedicoSeleccionado( id: string ){

    if( id === 'nuevo' ){ return; }

    this.medicoService.getMedicosID( id )
    .pipe(
      delay(100)
    )
    .subscribe( medico => {

      this.medicoSeleccionado = medico;
      
      const { nombre, hospital:{ _id } } = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
      return;

    }, error  => {
      this.router.navigateByUrl(`/dashboard/medicos`);
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


}
