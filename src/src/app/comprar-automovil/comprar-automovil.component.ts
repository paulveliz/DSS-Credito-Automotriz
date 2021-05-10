import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Automovil } from '../interfaces/automovil.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';
import { AutomovilesService } from '../services/automoviles.service';
import { ReportesService } from '../services/reportes.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-comprar-automovil',
  templateUrl: './comprar-automovil.component.html',
  styleUrls: ['./comprar-automovil.component.css']
})
export class ComprarAutomovilComponent implements OnInit {

  public automovil:Automovil | null = null;
  public solicitudId:number = 0;
  public autoFinanciado:FinanciarResponse | null = null;
  private planId:number = 0;
  private clienteId:number = 0;
  private automovilId:number = 0;
  public congrats:boolean = false;

  constructor(private route:ActivatedRoute,
              // private router:Router,
              private apiAutos:AutomovilesService,
              private apiReport:ReportesService,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.planId = params.planId;
      this.clienteId = params.clienteId;
      this.automovilId = params.automovilId;
      this.solicitudId = params.solicitudId;

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
    if(this.autoFinanciado){
      this.payEstatus(true);
      var mediaType = 'application/pdf';
      this.apiReport.GenerarReporteEnganche(this.automovilId, this.planId, this.clienteId, this.solicitudId, this.autoFinanciado)
      .subscribe(
        (response) => {
          this.payEstatus(false);
          this.openModal(false);
          var blob = new Blob([response], { type: mediaType });
          window.open(URL.createObjectURL(blob));
          saveAs(blob, 'ficha-pago.pdf');
          this.congrats = true;
          // this.router.navigate(['congrats']);
        }, err => {
          this.payEstatus(false);
          this.openModal(false);
          var blob = new Blob([err], { type: mediaType });
          window.open(URL.createObjectURL(blob));
          saveAs(blob, 'ficha-pago.pdf');
          this.congrats = true;
        });
    }else{
      alert("Nada que comprar.");
    }
  }

  openModal(action:boolean): void {
    const modal = <HTMLDivElement>document.querySelector('.modal');
    modal.style.visibility = action ? 'visible' : 'hidden';
    modal.style.opacity = action ? '100%' : '0%';
  }

  payEstatus(loading:boolean):void{
    const paytext = <HTMLParagraphElement>document.querySelector('#paytext');
    const paybutton = <HTMLButtonElement>document.querySelector('#paybutton');
    paytext.innerText = loading == true ? "GENERANDO RECIBO DE PAGO..." : `
      Al aceptar este formulario estará aceptando el contrato y pagará el enganche
      previamente financiado.
      ¿Continuar con la compra?
    `;
    paybutton.style.visibility = 'hidden';

  }

  goToSession(){
    this.router.navigate(['acceso']);
  }



}
