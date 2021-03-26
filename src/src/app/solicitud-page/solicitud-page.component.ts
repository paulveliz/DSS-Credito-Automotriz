import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private clientesServie:ClientesService) { }

  
  public get cliente() : ClienteResponse {
    const cl = <ClienteResponse>this.clientesServie.cliente;
    return cl;
  }

  
  public get solicitud() : SolicitudResponse{
    return this.clientesServie.solicitud;
  }

  public get planSugerido() : PlanResponse{
    this.clientesServie.ObtenerPlanPorId(this.solicitud.resultados.plan_sugerido.id_plan);
    return this.clientesServie.plan;
  }

  
  

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      // TODO: Implementar JWT
      this.clientesServie.ObtenerClientePorId(Number.parseInt(params.clienteId));
      this.clientesServie.ObtenerSolicitudDeCliente(Number.parseInt(params.clienteId));
    });
  }

}
