import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() { 
    // this.retornaObservable().pipe(
    //   retry(2) // esta funcion permite reintentar ejecutar nuevamente el observable
    //           // puede tener como parametro la cantidad de intentos que puede realizar
    // )
    // .subscribe(
    //   valor => console.log( "Subs: ", valor),
    //   error => console.log("Error en el observer", error),
    //   () => console.log("Proceso terminado")
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor)
    )

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe(); // cancela la suscripcion de observable
  }

  retornaIntervalo(): Observable<number>{
    return interval(1000)
            .pipe(
              // take(10),
              map( valor => valor + 1 ),
              filter( valor => ( valor %2 === 0 ) ? true : false),
              
            );
  }

  retornaObservable(): Observable<number>{
    let i = 0;
    // el nombre de los observables suelen tener un $ al final
    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval( () => {
        i++;
        observer.next(i); // retorna el valor que maneja el observer

        if(i == 10)
        {
          clearInterval(intervalo);
          observer.complete(); // cierra o termina la funcion del observer
        }

        if( i == 2)
        {
          console.log("entro en error")
          observer.error( "Llego al valor de 2" ); // retorna un error en el observer
        }

      }, 1000 );

    } );

    return obs$;
  }

}
