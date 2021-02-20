import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { Error404Component } from './error404/error404.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { SolicitarCreditoComponent } from './solicitar-credito/solicitar-credito.component';
import { NuestrosClientesComponent } from './nuestros-clientes/nuestros-clientes.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent, pathMatch: 'full' },
  { path: '404', component: Error404Component },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'solicitar', component: SolicitarCreditoComponent },
  { path: 'clientes', component: NuestrosClientesComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
