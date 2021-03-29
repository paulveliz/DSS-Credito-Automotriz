import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteResponse } from '../models/clienteResponse.interface';
import { PlanResponse } from '../models/planResponse.interface';
import { SolicitudResponse } from '../models/solicitudResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {
  }

  ObtenerPlanPorId(planId:Number){
    return this.http.get<PlanResponse>(`https://localhost:5001/api/planes/${planId}`);
  }

  ObtenerSolicitudDeCliente(clienteId:Number): Observable<SolicitudResponse>{
    return this.http.post<SolicitudResponse>(`https://localhost:5001/api/solicitudes/cliente/${clienteId}`, {});
      // .subscribe( (response:SolicitudResponse) => {
      //   this.solicitud = response;
      //   // this.solicitud.resultados.plan_sugerido.descripcion
      // });
  }

  ObtenerClientePorId(clienteId:Number):Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`https://localhost:5001/api/clientes/${clienteId}`);
  }
  // TODO REFACTOR
  ObtenerClientesExistentes():Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>('https://localhost:5001/api/clientes');
  }

  // TODO REFACTOR
  CrearNuevoCLiente(cliente: Object):Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>('https://localhost:5001/api/clientes/nuevo', cliente);
  }
}
