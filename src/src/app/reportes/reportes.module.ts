import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPagoComponent } from './ficha-pago/ficha-pago.component';



@NgModule({
  declarations: [
    FichaPagoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FichaPagoComponent,
  ]
})
export class ReportesModule { }
