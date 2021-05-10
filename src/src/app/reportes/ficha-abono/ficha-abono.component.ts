import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeudasClientesResponse } from 'src/app/models/deudasClientesResponse.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-ficha-abono',
  templateUrl: './ficha-abono.component.html',
  styleUrls: ['./ficha-abono.component.css']
})
export class FichaAbonoComponent implements OnInit {

  deuda:DeudasClientesResponse | null = null;
  automovil:string = '';
  constructor(
    private apiClient:ClientesService,
    private route:ActivatedRoute
  ) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      
      this.apiClient.ObtenerDeudaPorId(params.deudaId).subscribe(deuda=>{
        this.deuda = deuda;
        this.automovil = `${deuda.idFinanciamientoNavigation.idAutomovilNavigation.idModeloNavigation.idMarcaNavigation.nombre} ${deuda.idFinanciamientoNavigation.idAutomovilNavigation.idModeloNavigation.nombre}`
      });

    });
  }

}
