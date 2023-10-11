import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {

  constructor(private http: HttpClient) { }

  replanIntervention(interventionId: number, date: Date): Observable<any> {
    if (!date || isNaN(date.getTime())) {
      console.error('Date invalide :', date);
      return throwError('Date invalide');
    }
  
    const data = date.toISOString();
  
    const url = `${environment.backendUrl}/interventions/${interventionId}/replan?date=${data}`;
  
    console.log('Données envoyées dans la requête PUT :', data);
    return this.http.put(url, data);
  }


  assignInterventionToTech(interventionId: number, techId: number): Observable<any> {
    const url = `${environment.backendUrl}/interventions/${interventionId}/assign?techId=${techId}`;
    return this.http.put(url, null);
  }

  getInterventions(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/interventions/all`);
  }

  getAllTechs(): Observable<any> {
    return this.http.get<any>(`${environment.backendUrl}/users/getAllTechs`);
  }

  getInterventionById(id: number): Observable<any> {
    const url = `${environment.backendUrl}/interventions/${id}`;
    return this.http.get(url);
  }

  // startEnRoute(id: number) : Observable<any> {
  //   const url = `${environment.backendUrl}/interventions/startEnRoute/${id}`
  //   return this.http.put(url);
  // }
  
}
