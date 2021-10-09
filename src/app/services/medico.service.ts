import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string{ return localStorage.getItem('token') || ''; }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos() {

    const url = `${ base_url }/medicos`;

    return this.http.get<Medico[]>( url, this.headers )
    .pipe(
      map( (resp: any)  => resp.medicos )
    )

  }

  getMedicosID( id: string ) {

    const url = `${ base_url }/medicos/${id}`;

    return this.http.get( url, this.headers )
    .pipe(
      map( (resp: any)  => resp.medico )
    )

  }

  crearMedicos( medico: { nombre: string, hospital: string} ) {

    const url = `${ base_url }/medicos`;

    return this.http.post( url, medico,this.headers);

  }

  actualizarMedicos( medico: Medico ) {

    const url = `${ base_url }/medicos/${medico.id}`;

    return this.http.put( url, medico,this.headers);

  }

  borrarMedicos( id: string ) {

    const url = `${ base_url }/medicos/${id}`;

    console.log(url);

    return this.http.delete( url, this.headers);

  }


}
