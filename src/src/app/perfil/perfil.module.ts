import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccesoComponent } from './acceso/acceso.component';
import { RouterModule } from '@angular/router';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';



@NgModule({
  declarations: [AccesoComponent, PerfilClienteComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    AccesoComponent,
    PerfilClienteComponent
  ]
})
export class PerfilModule { }
