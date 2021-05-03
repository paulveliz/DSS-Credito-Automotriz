import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoComponent } from './acceso/acceso.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AccesoComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    AccesoComponent
  ]
})
export class PerfilModule { }
