import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Automovil } from '../interfaces/automovil.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';

@Component({
  selector: 'app-comprar-automovil',
  templateUrl: './comprar-automovil.component.html',
  styleUrls: ['./comprar-automovil.component.css']
})
export class ComprarAutomovilComponent implements OnInit {

  public automovil:Automovil | null = null;
  public autoFinanciado:FinanciarResponse | null = null;

  constructor(private route:ActivatedRoute,
              private apiAutos:AutomovilesService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      console.log(params.clienteId);
      console.log(params.automovilId);
      // plan id

      this.apiAutos.ObtenerAutomovilId(<number>params.automovilId).subscribe( automovil => {
        this.automovil = automovil;
        // automovil.plan_financiamiento.descripcion
        this.apiAutos.FinanciarAutomovil(automovil).subscribe( response => {
          this.autoFinanciado = response;
        });
      });

    });
  }



}
