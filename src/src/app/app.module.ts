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
import { FooterComponent } from './footer/footer.component';
import { SolicitaCreditoPageComponent } from './solicita-credito-page/solicita-credito-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SolicitudPageComponent } from './solicitud-page/solicitud-page.component';
import { FinanciarPageComponent } from './financiar-page/financiar-page.component';
import { ComprarAutomovilComponent } from './comprar-automovil/comprar-automovil.component';
import { FichaPagoComponent } from './reportes/ficha-pago/ficha-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    BienvenidaComponent,
    Error404Component,
    NosotrosComponent,
    SolicitarCreditoComponent,
    NuestrosClientesComponent,
    FooterComponent,
    SolicitaCreditoPageComponent,
    SolicitudPageComponent,
    FinanciarPageComponent,
    ComprarAutomovilComponent,
    FichaPagoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
