import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../models/clienteResponse.interface';
import { PlanResponse } from '../models/planResponse.interface';
import { SolicitudResponse } from '../models/solicitudResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient) {
  }

  ObtenerPlanPorId(planId:Number){
    return this.http.get<PlanResponse>(`https://automotriz-webapi.azurewebsites.net/api/planes/${planId}`,{
      headers: this.headers 
    });
  }

  ObtenerSolicitudDeCliente(clienteId:Number): Observable<SolicitudResponse>{
    return this.http.post<SolicitudResponse>(`https://automotriz-webapi.azurewebsites.net/api/solicitudes/cliente/${clienteId}`, {});
      // .subscribe( (response:SolicitudResponse) => {
      //   this.solicitud = response;
      //   // this.solicitud.resultados.plan_sugerido.descripcion
      // });
  }

  ObtenerClientePorId(clienteId:Number):Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`https://automotriz-webapi.azurewebsites.net/api/clientes/${clienteId}`);
  }
  // TODO REFACTOR
  ObtenerClientesExistentes():Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>('https://automotriz-webapi.azurewebsites.net/api/clientes', {
      headers: this.headers
    });
  }

  // TODO REFACTOR
  CrearNuevoCLiente(cliente: Object):Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>('https://automotriz-webapi.azurewebsites.net/api/clientes/nuevo', cliente);
  }
}
