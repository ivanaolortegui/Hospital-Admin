import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { DunutsComponent } from './dunuts/dunuts.component';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DunutsComponent,
    ModalImagenComponent,
  ],
  exports: [
    IncrementerComponent,
    DunutsComponent,
    ModalImagenComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
