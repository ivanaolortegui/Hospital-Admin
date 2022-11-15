import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { UserService } from '../services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { MedicsComponent } from './maintenance/medics/medics.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicComponent } from './maintenance/medics/medic.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent,
    AccountSettingComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
    SearchComponent],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
