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

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent,
    AccountSettingComponent],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
