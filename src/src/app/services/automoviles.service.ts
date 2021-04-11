import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Automovil, PlanFinanciamiento } from '../interfaces/automovil.interface';
import { AutosPorPlanResponse } from '../models/autosPorPlanResponse.interface';
import { FinanciarResponse } from '../models/financiarResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AutomovilesService {

  public autosPorPlan: any;

  constructor(private http:HttpClient) {
   }

  FinanciarAutomovil(automovil:Automovil): Observable<FinanciarResponse>{
    return this.http.post<FinanciarResponse>(`${environment.apiUrl}/api/solicitudes/financiar`, {
      id_automovil: automovil.id_auto,
      id_plan: automovil.plan_financiamiento.id_plan,
      meses: 60
    });
  }

  ObtenerAutosPorPlan(planId:Number): Observable<AutosPorPlanResponse>{
    // https://localhost:5001/api/planes/1/autos
    return this.http.get<AutosPorPlanResponse>(`${environment.apiUrl}/api/planes/${planId}/autos`);
  }

  ObtenerPlanesInferiores(planId:Number): Observable<PlanFinanciamiento[]>{
    return this.http.get<PlanFinanciamiento[]>(`https://localhost:5001/api/planes/inferioridad/${planId}`);
  }

}
