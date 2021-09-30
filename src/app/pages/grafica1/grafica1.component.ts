import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Concretadas', 'Prospectos', 'Otros'];
  public labels2: string[] = ['Realizadas', 'Concretadas', 'Otros'];
  public labels3: string[] = ['Del día', 'En espera', 'Realizadas'];
  public data1 = [[10, 20, 40]];
  public data2 = [[100, 120, 90]];
  public data3 = [[54, 25, 20]];
  public data4 = [[12, 200, 78]];
  

}
