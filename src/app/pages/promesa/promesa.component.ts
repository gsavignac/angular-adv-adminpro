import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( ( resolve, reject ) => {
      
    //   if (false){
    //     resolve("hola mundo");
    //   }else{
    //     reject("Algo salio mal");
    //   }
      
    // } );

    // promesa.then( (mensaje) => {
    //   console.log(mensaje);
    // })
    // .catch( (error) => { 
    //   console.log("Error en el Init ", error); 
    // });

    // console.log("fin del Init");

    this.getUsuarios()
    .then( usuarios => {
      console.log(usuarios)
    });

  }

  getUsuarios(){

    const promesa = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data) );
    }) 

    return promesa;
    
  }

}
