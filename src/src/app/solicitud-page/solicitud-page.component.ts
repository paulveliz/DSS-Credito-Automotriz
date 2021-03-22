import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteResponse } from '../models/clienteResponse.interface';
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
  

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.clientesServie.ObtenerClientePorId(Number.parseInt(params.clienteId))
    });
  }

}
