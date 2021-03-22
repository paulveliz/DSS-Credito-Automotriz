import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteResponse } from '../models/clienteResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes: any[] = [];
  public cliente: any;
  constructor(private http: HttpClient) {
    
  }

  ObtenerClientePorId(clienteId:Number){
    this.http.get<ClienteResponse>(`https://localhost:5001/api/clientes/${clienteId}`)
      .subscribe( (response:ClienteResponse) => {
        this.cliente = response;
      });
  }

  ObtenerClientesExistentes(){
    return new Promise((resolve, reject) => {
      this.http.get('https://localhost:5001/api/clientes')
      .subscribe((response: any) => {
        console.warn('Peticion realizada: <OBTENER TODOS LOS CLIENTES>');
        resolve(response);
        this.clientes = response;
      });
    });
  }

  // TODO REFACTOR
  CrearNuevoCLiente(cliente: Object): Promise<[isOk: Boolean, clienteResponse:ClienteResponse | null | Object, code: Number, msg: string]>{
    return new Promise((resolve, reject) => {
      this.http.post<ClienteResponse>('https://localhost:5001/api/clientes/nuevo', cliente)
      .subscribe( 
        (response: ClienteResponse) => {
          console.warn('Peticion realizada: <CREAR NUEVO CLIENTE>');
          return resolve([response != null, response, 201, "ok"]);
        },
        (error: HttpErrorResponse) => {
          return resolve([error.ok, null, error.status, error.error.msg]);
        }
      )
    });

  }
}
