import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo_pagina: string = "";
  public titulo_susb$: Subscription;

  constructor( private router: Router) { 

   this.titulo_susb$ = this.getDataRuta().subscribe( ({ titulo }) => { // esta sintaxis permite extraer el argumento titulo del evento
      this.titulo_pagina = titulo;
      document.title = `AdminPro - ${ titulo }`;
    })

  }
  ngOnDestroy(): void {
    this.titulo_susb$.unsubscribe();
  }

  getDataRuta()
  {
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data )
    );
    
  }

}
