import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automovil } from '../interfaces/automovil.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';
import { ReportesService } from '../services/reportes.service';

@Component({
  selector: 'app-comprar-automovil',
  templateUrl: './comprar-automovil.component.html',
  styleUrls: ['./comprar-automovil.component.css']
})
export class ComprarAutomovilComponent implements OnInit {

  public automovil:Automovil | null = null;
  public autoFinanciado:FinanciarResponse | null = null;
  private planId:number = 0;
  private clienteId:number = 0;
  private automovilId:number = 0;

  constructor(private route:ActivatedRoute,
              // private router:Router,
              private apiAutos:AutomovilesService,
              private apiReport:ReportesService
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params.clienteId);
      console.log(params.automovilId);
      console.log(params.planId);
      // plan id
      this.planId = params.planId;
      this.clienteId = params.clienteId;
      this.automovilId = params.automovilId;

      this.apiAutos.ObtenerAutomovilId(<number>params.automovilId).subscribe( automovil => {
        this.automovil = automovil;
        // automovil.plan_financiamiento.descripcion
        this.apiAutos.FinanciarAutomovil(automovil).subscribe( response => {
          this.autoFinanciado = response;
        });
      });

    });
  }
  comprarAuto(){
      this.apiReport.GenerarReporteEnganche(this.automovilId, this.planId, this.clienteId)
                    .subscribe( pdf => {
                      window.open(pdf);
                    });
  }



}
