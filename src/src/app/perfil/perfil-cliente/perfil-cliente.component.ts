import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteResponse } from 'src/app/models/clienteResponse.interface';
import { DeudasClientesResponse, IDFinanciamientoNavigation } from 'src/app/models/deudasClientesResponse.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  public cliente:ClienteResponse | null = null;
  public deudas:DeudasClientesResponse[] | null = null;
  public selectedDeudas:boolean = false;
  public clickedDeuda:DeudasClientesResponse | null = null;
  public isLoading:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private apiClient:ClientesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiClient.ObtenerClientePorCurp(params.clienteId).subscribe(cliente =>{
        this.cliente = cliente;
      });
    });
  }

  openModal(action:boolean, deuda:DeudasClientesResponse | null): void {
    this.clickedDeuda = deuda;
    const modal = <HTMLDivElement>document.querySelector('.modal');
    modal.style.visibility = action ? 'visible' : 'hidden';
    modal.style.opacity = action ? '100%' : '0%';
  }

  cagarDeudas():void{
    this.selectedDeudas = !this.selectedDeudas;
    if(this.cliente){
      this.apiClient.ObtenerDeudasCliente(this.cliente.datos_generales.curp).subscribe(d =>{
        this.deudas = d;
      });
    }else{
      alert("ERROR: EL CLIENTE NO EXISTE EN EL ENTORNO.");
    }
  }

  abonarDeuda():void{
    if(this.clickedDeuda){
      this.isLoading = true;
      this.apiClient.AbonarAdeuda(this.clickedDeuda.id).subscribe(abono =>{
        if(this.cliente){
          this.apiClient.ObtenerDeudasCliente(this.cliente.datos_generales.curp).subscribe(d =>{
            this.deudas = d;
            // Generar reporte.
            this.isLoading = false;
            this.openModal(false, null);
          });
        }else{
          alert("ERROR: EL CLIENTE NO EXISTE EN EL ENTORNO.");
        }
      });
    }
  }

}
