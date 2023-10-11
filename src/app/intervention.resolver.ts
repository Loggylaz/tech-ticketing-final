import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InterventionService } from './services/intervention.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionResolver implements Resolve<Observable<any>> {

  constructor(private interventionService: InterventionService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.paramMap.get('id');
    if (id !== null) {
      const numericId = +id;
      return this.interventionService.getInterventionById(numericId);
    }
    return of(null);
  }
}
