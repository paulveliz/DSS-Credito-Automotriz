import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinanciarResponse } from '../models/financiarResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }

  GenerarReporteEnganche(automovilId:number, planId:number, clienteId:number, solicitudId:number, financiamiento:FinanciarResponse):Observable<any>{
    console.log('GENERANDO REPORTE')
    
    return this.http.post(`${environment.apiUrl}/api/report/enganche`,{
      Item1:{
        url: `https://gentle-bush-024fdce10.azurestaticapps.net/#/reporte/enganche/automovil/${automovilId}/plan/${planId}/cliente/${clienteId}`
      },
      Item2:{
        IdCliente: clienteId,
        ValorDelAuto: financiamiento.valor_del_auto,
        Enganche: financiamiento.enganche,
        CantidadAFinanciar: financiamiento.cantidad_a_financiar,
        Meses: financiamiento.meses,
        Mensualidad: financiamiento.mensualidad,
        IdAutomovil: financiamiento.automovil.id
      },
      Item3:{
        IdCliente: clienteId,
        IdSolicitud: solicitudId 
      }
    }, { responseType: 'blob' });
  }

  GenerarReporteAbono(deudaId:number):Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/report/abono`,{
      url: `https://gentle-bush-024fdce10.azurestaticapps.net/#/reporte/abono/deuda/${deudaId}`
    }, { responseType: 'blob' });
  }

}

