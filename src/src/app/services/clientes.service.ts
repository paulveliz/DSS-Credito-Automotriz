import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes: any[] = [];
  public response: Object = new Object;
  public working: Boolean = false;
  constructor(private http: HttpClient) {}

  ObtenerClientesExistentes(){
    this.http.get('https://localhost:5001/api/clientes')
    .subscribe((response: any) => {
      console.log(response);
      this.clientes = response;
    });
  }

  CrearNuevoCLiente(cliente: Object): void{
    this.working = true;
    this.http.post('https://localhost:5001/api/clientes/nuevo', cliente)
    .subscribe( (response: any) => {
      this.working = false;
      this.response = response;
      console.log(response);
    });
  }
}
