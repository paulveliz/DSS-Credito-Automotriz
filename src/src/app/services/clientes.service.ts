import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteResponse } from '../models/clienteResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes: any[] = [];
  constructor(private http: HttpClient) {}

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

  CrearNuevoCLiente(cliente: Object): Promise<[isOk: Boolean, clienteResponse:ClienteResponse | null | Object, code: Number, msg: string]>{
    return new Promise((resolve, reject) => {
      this.http.post<HttpResponse<ClienteResponse>>('https://localhost:5001/api/clientes/nuevo', cliente)
      .subscribe( 
        (response: HttpResponse<ClienteResponse>) => {
          console.warn('Peticion realizada: <CREAR NUEVO CLIENTE>');
          return resolve([true, response, 201, "ok"]);
        },
        (error: HttpErrorResponse) => {
          return resolve([error.ok, null, error.status, error.error.msg]);
        }
      )
    });

  }
}
