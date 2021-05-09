import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbonarDeudaResponse } from '../models/abonarDeudaResponse.interface';
import { ClienteResponse } from '../models/clienteResponse.interface';
import { DeudasClientesResponse } from '../models/deudasClientesResponse.interface';
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
    return this.http.get<PlanResponse>(`${environment.apiUrl}/api/planes/${planId}`,{
      headers: this.headers 
    });
  }

  ObtenerSolicitudDeCliente(clienteId:Number): Observable<SolicitudResponse>{
    return this.http.post<SolicitudResponse>(`${environment.apiUrl}/api/solicitudes/cliente/${clienteId}`, {});
      // .subscribe( (response:SolicitudResponse) => {
      //   this.solicitud = response;
      //   // this.solicitud.resultados.plan_sugerido.descripcion
      // });
  }

  ObtenerClientePorId(clienteId:Number):Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${environment.apiUrl}/api/clientes/${clienteId}`);
  }

  ObtenerClientePorCurp(clienteId:string):Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${environment.apiUrl}/api/clientes/curp/${clienteId}`);
  }
  // TODO REFACTOR
  ObtenerClientesExistentes():Observable<ClienteResponse[]>{
    return this.http.get<ClienteResponse[]>(`${environment.apiUrl}/api/clientes`, {
      headers: this.headers
    });
  }

  // TODO REFACTOR
  CrearNuevoCLiente(cliente: Object):Observable<ClienteResponse>{
    return this.http.post<ClienteResponse>(`${environment.apiUrl}/api/clientes/nuevo`, cliente);
  }

  ObtenerDeudasCliente(curp:string):Observable<DeudasClientesResponse[]>{
    return this.http.get<DeudasClientesResponse[]>(`${environment.apiUrl}/api/deudas/${curp.trim()}`);
  }

  AbonarAdeuda(deudaId:number):Observable<AbonarDeudaResponse>{
    return this.http.post<AbonarDeudaResponse>(`${environment.apiUrl}/api/deudas/abonar/${deudaId}`, {});
  }
}
