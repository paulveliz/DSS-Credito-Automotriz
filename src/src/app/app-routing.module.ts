import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { Error404Component } from './error404/error404.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SolicitarCreditoComponent } from './solicitar-credito/solicitar-credito.component';
import { NuestrosClientesComponent } from './nuestros-clientes/nuestros-clientes.component';
import { SolicitaCreditoPageComponent } from './solicita-credito-page/solicita-credito-page.component';
import { SolicitudPageComponent } from './solicitud-page/solicitud-page.component';
import { FinanciarPageComponent } from './financiar-page/financiar-page.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full' },
  { path: '404', component: Error404Component },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'solicitar', component: SolicitarCreditoComponent },
  { path: 'clientes', component: NuestrosClientesComponent },
  { path: 'solicitar/solicita-page', component: SolicitaCreditoPageComponent },
  { path: 'nueva-solicitud/:clienteId', component: SolicitudPageComponent },
  { path: 'financiar/cliente/:clienteId/plan/:planId', component: FinanciarPageComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
