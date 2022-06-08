import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { DunutsComponent } from './dunuts/dunuts.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DunutsComponent
  ],
  exports: [
    IncrementerComponent,
    DunutsComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
