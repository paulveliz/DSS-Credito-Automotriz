import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutosPorPlanResponse } from '../models/autosPorPlanResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';

@Component({
  selector: 'app-financiar-page',
  templateUrl: './financiar-page.component.html',
  styleUrls: ['./financiar-page.component.css']
})
export class FinanciarPageComponent implements OnInit {

  public autosPorPlan: any;
  

  constructor(private route:ActivatedRoute,
              private financiar:AutomovilesService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      // Params: clienteId, planId
      this.financiar.ObtenerAutosPorPlan(params.planId).subscribe( autos => {
        this.autosPorPlan = autos;
      });

    });
  }

}
