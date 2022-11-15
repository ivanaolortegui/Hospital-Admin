import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { MedicComponent } from './maintenance/medics/medic.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    //canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingComponent, data: { titulo: 'Ajustes de cuenta' } },
      { path: 'search/:term', component: SearchComponent, data: { titulo: 'Busquedas' } },
      { path: 'graphic-one', component: GraphicOneComponent, data: { titulo: 'Gráfica #1' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },

      //Mantaine

      { path: 'users', component: UsersComponent, data: { titulo: 'Mantenimiento de Usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
      { path: 'medics', component: MedicsComponent, data: { titulo: 'Mantenimiento de Medicos' } },
      { path: 'medic/:id', component: MedicComponent, data: { titulo: 'Matenimiento de Medicos' } },

      { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { titulo: 'Matenimiento de Usuarios' } },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }

