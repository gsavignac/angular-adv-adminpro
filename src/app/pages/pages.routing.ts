import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesaComponent } from './promesa/promesa.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'}}, 
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar'}},
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Usuario'}},
            { path: 'promesa', component: PromesaComponent, data: { titulo: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'}},

            // mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'}},
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales'}},
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'}},
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médicos'}},

        ]
    }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
