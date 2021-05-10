import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FichaPagoComponent } from './ficha-pago/ficha-pago.component';
import { FichaAbonoComponent } from './ficha-abono/ficha-abono.component';



@NgModule({
  declarations: [
    FichaPagoComponent,
    FichaAbonoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FichaPagoComponent,
    FichaAbonoComponent
  ]
})
export class ReportesModule { }
