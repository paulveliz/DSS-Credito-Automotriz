import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automovil, PlanFinanciamiento } from '../interfaces/automovil.interface';
import { AutosPorPlanResponse } from '../models/autosPorPlanResponse.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';
import { Marca } from '../models/planResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';

@Component({
  selector: 'app-financiar-page',
  templateUrl: './financiar-page.component.html',
  styleUrls: ['./financiar-page.component.css']
})
export class FinanciarPageComponent implements OnInit {

  public clienteActual: Number  = 0;
  public planCliente: Number = 0;
  public autosPorPlan: any;
  public selectedAuto:Automovil | any;
  public selectedAutoFinanciamiento:FinanciarResponse | any;
  public planesInferiores:PlanFinanciamiento[] | any;
  public solicitudId:number = 0;
  // public marcasDeInferiores:Marca[] | any;

  constructor(private route:ActivatedRoute,
              private financiar:AutomovilesService,
              private renderer:Renderer2,
              private router:Router) { 
                
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
      this.clienteActual = params.clienteId;
      this.planCliente = params.planId;
      this.solicitudId = params.solicitudId;
      this.financiar.ObtenerAutosPorPlan(params.planId).subscribe( autos => {
        this.autosPorPlan = autos;
        this.financiar.ObtenerPlanesInferiores(params.planId).subscribe( planes => {
          this.isLoading(false);
          this.planesInferiores = planes;
        })
      });

    });
  }

  comprarAutomovil(automovil:Automovil):void{
    this.router.navigate([`comprar-automovil/${automovil.id_auto}/cl/${this.clienteActual}/plan/${this.planCliente}/${this.solicitudId}`]);
  }

  cambiarDePlan():void{
    const selectPlan = (<HTMLSelectElement>document.querySelector('#planSelector'));
    const selectedPlan = selectPlan.options[selectPlan.selectedIndex].value;
    this.planCliente = parseInt(selectedPlan);
    // this.router.navigate([`financiar/cliente/${this.clienteActual}/plan/${selectedPlan}`]);
    // TODO VALIDAR
    if(isNaN(parseInt(selectedPlan))){
      return;
    }
    this.isLoading(true);
    this.financiar.ObtenerAutosPorPlan(parseInt(selectedPlan)).subscribe( autos => {
      this.autosPorPlan = autos;
      this.isLoading(false);
    });

  }

}
