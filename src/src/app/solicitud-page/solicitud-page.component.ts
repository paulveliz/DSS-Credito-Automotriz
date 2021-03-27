import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteResponse } from '../models/clienteResponse.interface';
import { PlanResponse } from '../models/planResponse.interface';
import { SolicitudResponse } from '../models/solicitudResponse.interface';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrls: ['./solicitud-page.component.css']
})
export class SolicitudPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
              private clientesServie:ClientesService,
              private router:Router) {

   }

  public get cliente() : ClienteResponse {
    return this.clientesServie.cliente;
  }

  
  public get solicitud() : SolicitudResponse{
    return this.clientesServie.solicitud;
  }

  public get planSugerido() : PlanResponse{
    return this.clientesServie.plan;
  }
  
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      // TODO: Implementar JWT
      this.clientesServie.ObtenerClientePorId(Number.parseInt(params.clienteId));
      this.clientesServie.ObtenerSolicitudDeCliente(Number.parseInt(params.clienteId))
      .subscribe( sl => {
        this.clientesServie.ObtenerPlanPorId(sl.resultados.plan_sugerido.id_plan);
        this.clientesServie.solicitud = sl;
      });
    });
  }

  financiarAutomovil(){
    if(this.cliente && this.planSugerido){
      this.router.navigate([`financiar/cliente/${this.cliente.datos_generales.id_cliente}/plan/${this.planSugerido.id_plan}`]);
    }else{
      alert('No se ha detectado un cliente y un plan.');
    }
  }

}
