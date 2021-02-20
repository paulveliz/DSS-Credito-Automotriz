import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { Error404Component } from './error404/error404.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SolicitarCreditoComponent } from './solicitar-credito/solicitar-credito.component';
import { NuestrosClientesComponent } from './nuestros-clientes/nuestros-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    BienvenidaComponent,
    Error404Component,
    NosotrosComponent,
    SolicitarCreditoComponent,
    NuestrosClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
