import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http:HttpClient) { }

  GenerarReporteEnganche(automovilId:number, planId:number, clienteId:number):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/api/report/enganche`, {
      url: `https://gentle-bush-024fdce10.azurestaticapps.net/#/reporte/enganche/automovil/${automovilId}/plan/${planId}/cliente/${clienteId}`
    });
  }

}

