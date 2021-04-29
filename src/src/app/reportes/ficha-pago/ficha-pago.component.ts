import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Automovil } from 'src/app/interfaces/automovil.interface';
import { ClienteResponse } from 'src/app/models/clienteResponse.interface';
import { FinanciarResponse } from 'src/app/models/financiarResponse.interface';
import { AutomovilesService } from 'src/app/services/automoviles.service';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-ficha-pago',
  templateUrl: './ficha-pago.component.html',
  styleUrls: ['./ficha-pago.component.css'],
  moduleId: 'reportes.module'
})
export class FichaPagoComponent implements OnInit {

  clienteId:number = 0;
  automovilId:number = 0;
  planId:number = 0;
  fecha:string = '...';

  automovil:Automovil | null = null;
  financiado:FinanciarResponse | null = null;
  cliente:ClienteResponse | null = null;

  constructor(
    private route:ActivatedRoute,
    private apiAutos:AutomovilesService,
    private apiClientes:ClientesService
  ) { 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.fecha = mm + '/' + dd + '/' + yyyy;
  }

  ngOnInit(): void {
    this.route.params.subscribe( parameters => {
      // GET PARAMS
      // :automovilId :planId :clienteId
      this.clienteId = parameters.clienteId;
      this.automovilId = parameters.automovilId;
      this.planId = parameters.planId;

      // GET AUTOMOVIL
      this.apiAutos.ObtenerAutomovilId(this.automovilId).subscribe(automovil => {
        console.log(automovil);
        this.automovil = automovil;
        // GET FINANCIAMIENTO
        this.apiAutos.FinanciarAutomovil(this.automovil).subscribe( financiado => {
          console.log(financiado);
          this.financiado = financiado;
          // GET CLIENT DATA
          this.apiClientes.ObtenerClientePorId(this.clienteId).subscribe(cliente => {
            console.log(cliente)
            this.cliente = cliente;
          });

        });

      });

      

    });


  }
}
