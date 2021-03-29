import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutosPorPlanResponse } from '../models/autosPorPlanResponse.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AutomovilesService {

  public autosPorPlan: any;

  constructor(private http:HttpClient) {
   }

  FinanciarAutomovil(automovilId:Number): Observable<FinanciarResponse>{
    return this.http.post<FinanciarResponse>(`https://automotriz-webapi.azurewebsites.net/api/solicitudes/financiar`, {
      id_automovil: automovilId,
      id_plan: 0,
      meses: 60
    });
  }

  ObtenerAutosPorPlan(planId:Number): Observable<AutosPorPlanResponse>{
    // https://localhost:5001/api/planes/1/autos
    return this.http.get<AutosPorPlanResponse>(`https://automotriz-webapi.azurewebsites.net/api/planes/${planId}/autos`);
  }

}
