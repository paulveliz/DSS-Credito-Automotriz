import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Automovil } from '../interfaces/automovil.interface';
import { AutosPorPlanResponse } from '../models/autosPorPlanResponse.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';

@Component({
  selector: 'app-financiar-page',
  templateUrl: './financiar-page.component.html',
  styleUrls: ['./financiar-page.component.css']
})
export class FinanciarPageComponent implements OnInit {

  public autosPorPlan: any;
  public selectedAuto:Automovil | any;
  public selectedAutoFinanciamiento:FinanciarResponse | any;

  constructor(private route:ActivatedRoute,
              private financiar:AutomovilesService,
              private renderer:Renderer2) { 
                
              }

  makeLoader(): void{
    let bienvenida = <HTMLDivElement>document.querySelector('.path');
    let loading = <HTMLImageElement>this.renderer.createElement('img');
    this.renderer.setStyle(loading, 'display', 'none');
    loading.src = "../../assets/loading.gif";
    this.renderer.addClass(loading, 'loading');
    this.renderer.appendChild(bienvenida, loading);
  }

  openModal(action:boolean): void {
    const modal = <HTMLDivElement>document.querySelector('.modal');
    modal.style.visibility = action ? 'visible' : 'hidden';
    modal.style.opacity = action ? '100%' : '0%';
  }
  
  isLoading(res:Boolean): void{
    let bienvenida = <HTMLDivElement>document.querySelector('.automoviles');
    let loading = <HTMLImageElement>document.querySelector('.loading');
  
    this.renderer.setStyle(loading, 'display', `${(res) ? 'block' : 'none'}`);
    this.renderer.setStyle(bienvenida, 'display', `${(res) ? 'none' : 'flex'}`);
  }

  financiarAuto(auto:Automovil): void {
    this.isLoading(true);
    this.financiar.FinanciarAutomovil(auto).subscribe( response => {
      console.table(response);
      this.isLoading(false);
      // Abrir Modal y mostra informacion de financiamiento
      this.selectedAuto = auto;
      this.selectedAutoFinanciamiento = response;
      this.openModal(true);
    });
  }
  
  ngOnInit(): void {
    this.makeLoader();
    this.isLoading(true);
    this.route.params.subscribe( params => {
      // Params: clienteId, planId
      this.financiar.ObtenerAutosPorPlan(params.planId).subscribe( autos => {
        this.autosPorPlan = autos;
        this.isLoading(false);
      });

    });
  }

  comprarAutomovil(automovil:Automovil):void{
    console.log(`Comprando ${automovil.modelo.nombre}`);
  }

}
