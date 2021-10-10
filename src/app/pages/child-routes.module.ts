import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';



const childRoutes: Routes = [

    { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}}, 
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'}},
    { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'}},
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Usuario'}},
    { path: 'promesa', component: PromesaComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'}},

    // mantenimientos
    { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'}},
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'}},
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médicos'}},

    // busqueda general
    { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busquedas'}},
]


@NgModule({
  declarations: [],
  imports: [ CommonModule, RouterModule.forChild( childRoutes ) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
