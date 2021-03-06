import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto( archivo: File, tipo: 'usuarios'|'medicos'|'hospitales', id: string){

    try {

      const url = `${ base_url }/upload/${ tipo }/${ id }`;      
      const fromData = new FormData();

      fromData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers:{
          'x-token': localStorage.getItem('token') || ''
        },
        body: fromData
      } );

      const data = await resp.json();

      console.log(data);

      if( data.ok )
      {
        return data.nombreimg;
      }else{
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log(error)
      return false;
    }

  }

}
