import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraphicOneComponent } from './graphic-one/graphic-one.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    GraphicOneComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
