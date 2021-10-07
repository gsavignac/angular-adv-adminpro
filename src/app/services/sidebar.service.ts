import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Principal', url: '/'},
        { title: 'ProgressBar', url: './progress'},
        { title: 'Gráficas', url: './grafica1'},
        { title: 'Promesa', url: './promesa'},
        { title: 'Rxjs', url: './rxjs'},
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu:[
        { title: 'Usuarios', url: './usuarios'},
        { title: 'Hospitales', url: './hospitales'},
        { title: 'Médicos', url: './medicos'}
      ]
    }
  ];

  constructor() { }
}
