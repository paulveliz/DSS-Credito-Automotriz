import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public clientes: any[] = [];
  constructor(private http: HttpClient) {}

  ObtenerClientesExistentes(){
    this.http.get('https://localhost:5001/api/clientes')
    .subscribe((response: any) => {
      console.log(response);
      this.clientes = response;
    });
  }
}
