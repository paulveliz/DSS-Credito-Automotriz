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

  public solicitud: any;
  public cliente: any;
  public planSugerido: any;

  constructor(private route: ActivatedRoute, 
              private clientesServie:ClientesService,
              private router:Router) {

   }
  
  ngOnInit(): void {
    this.route.params.subscribe( params => {
      // TODO: Implementar JWT
          this.clientesServie.ObtenerClientePorId(Number.parseInt(params.clienteId))
                              .subscribe(clienteResponse => {
                                this.cliente = clienteResponse;
          this.clientesServie.ObtenerSolicitudDeCliente(Number.parseInt(params.clienteId))
                                .subscribe( sl => {
                                  this.solicitud = sl;
          this.clientesServie.ObtenerPlanPorId(sl.resultados.plan_sugerido.id_plan)
                                .subscribe(planResponse => {
                                  this.planSugerido = planResponse;
                                });
            });
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
