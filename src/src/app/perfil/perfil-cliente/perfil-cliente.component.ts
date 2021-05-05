import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteResponse } from 'src/app/models/clienteResponse.interface';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {

  public cliente:ClienteResponse | null = null;
  public selectedDeudas:boolean = false;

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

  openModal(action:boolean): void {
    const modal = <HTMLDivElement>document.querySelector('.modal');
    modal.style.visibility = action ? 'visible' : 'hidden';
    modal.style.opacity = action ? '100%' : '0%';
  }

}
