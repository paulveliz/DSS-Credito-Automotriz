import { Component, OnInit, Renderer2 } from '@angular/core';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-nuestros-clientes',
  templateUrl: './nuestros-clientes.component.html',
  styleUrls: ['./nuestros-clientes.component.css']
})
export class NuestrosClientesComponent implements OnInit {

  get clientes(){
    return this.clientesService.clientes;
  }

  makeLoader(): void{
    let clientesContainer = <HTMLDivElement>document.querySelector('.clientes-container');
    let loading = <HTMLImageElement>this.renderer.createElement('img');
    this.renderer.setStyle(loading, 'display', 'none');
    loading.src = "../../assets/loading.gif";
    this.renderer.addClass(loading, 'loading');
    this.renderer.appendChild(clientesContainer, loading);
  }

  isLoading(res:Boolean): void{
    let listaClientes = <HTMLDivElement>document.querySelector('.lista-clientes');
    let loading = <HTMLImageElement>document.querySelector('.loading');
  
    this.renderer.setStyle(loading, 'display', `${(res) ? 'block' : 'none'}`);
    this.renderer.setStyle(listaClientes, 'display', `${(res) ? 'none' : 'flex'}`);
  }
  constructor( private clientesService: ClientesService, private renderer:Renderer2) { }

  async ngOnInit() {
    this.makeLoader();
    this.isLoading(true);
    await this.clientesService.ObtenerClientesExistentes();
    this.isLoading(false);
  }

}
