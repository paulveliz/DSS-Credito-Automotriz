import { Component, OnInit } from '@angular/core';
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
  constructor( private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.clientesService.ObtenerClientesExistentes();
  }

}
