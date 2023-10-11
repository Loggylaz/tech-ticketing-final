import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InterventionService } from './services/intervention.service';

@Injectable({
  providedIn: 'root'
})
export class InterventionListResolver implements Resolve<Observable<any[]>> {

  constructor(private interventionService: InterventionService) {}

  resolve(): Observable<any[]> {
    return this.interventionService.getInterventions();
  }
}

