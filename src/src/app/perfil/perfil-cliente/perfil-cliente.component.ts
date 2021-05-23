import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteResponse } from 'src/app/models/clienteResponse.interface';
import { DeudasClientesResponse, IDFinanciamientoNavigation } from 'src/app/models/deudasClientesResponse.interface';
import { VerifyEncryptResponse } from 'src/app/models/verifyEncryptResponse.interface';
import { ClientesService } from 'src/app/services/clientes.service';
import { ReportesService } from 'src/app/services/reportes.service';

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
  public hasDataEncripted:VerifyEncryptResponse | null = null;
  public isLoading:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private apiClient:ClientesService,
    private apiReport:ReportesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiClient.ObtenerClientePorCurp(params.clienteId).subscribe(cliente =>{
        this.cliente = cliente;
        this.apiClient.VerificarEncriptado(cliente.datos_generales.id_cliente).subscribe(encrypted => {
          if(encrypted){
            this.hasDataEncripted = encrypted;
          }
        });
      });
    });
  }

  openModal(action:boolean, deuda:DeudasClientesResponse | null): void {
    this.clickedDeuda = deuda;
    const modal = <HTMLDivElement>document.querySelector('.modal');
    modal.style.visibility = action ? 'visible' : 'hidden';
    modal.style.opacity = action ? '100%' : '0%';
  }

  openModalInfoCliente(action:boolean){
    const modal = <HTMLDivElement>document.querySelector('.modal-info-client');
    console.log(modal)
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
            if(this.clickedDeuda){
              var mediaType = 'application/pdf';
              this.apiReport.GenerarReporteAbono(this.clickedDeuda.id)
              .subscribe(
                (response) => {
                  var blob = new Blob([response], { type: mediaType });
                  window.open(URL.createObjectURL(blob));
                  saveAs(blob, 'ficha-pago.pdf');
                  this.openModal(false, null);
                  this.isLoading = false;
                });
            }else{
              alert("Deuda incorrecta.");
            }
          });
        }else{
          alert("ERROR: EL CLIENTE NO EXISTE EN EL ENTORNO.");
        }
      });
    }
  }

  encriptarDatos(){
    if(this.cliente){
      this.isLoading = true;
      this.apiClient.EncriptarInformacion(this.cliente?.datos_generales.id_cliente).subscribe(res => {
        // Fix ??0
        this.apiClient.ObtenerClientePorId(this.cliente?.datos_generales.id_cliente ?? 0).subscribe(cliente =>{
          this.apiClient.VerificarEncriptado(cliente.datos_generales.id_cliente).subscribe(isEncrypted =>{
            this.isLoading = false;
            this.cliente = cliente;
            this.hasDataEncripted = isEncrypted;
            alert(res.msg);
          })
        }, err => alert('Ocurrio un error intentando obtener la informacion del cliente.'));
      });
    }else{
      alert("ERROR: EL CLIENTE NO EXISTE EN EL ENTORNO.");
    }
  }

}
