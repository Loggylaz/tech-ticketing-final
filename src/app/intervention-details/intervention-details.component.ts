import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterventionService } from '../services/intervention.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.scss']
})
export class InterventionDetailsComponent implements OnInit {

  intervention: any;
  enRouteClicked = false;
  arrivedAtCUClicked = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private interventionService: InterventionService
  ) { }

  goBack(): void {
    this.router.navigate(['/intervention']); 
  }

  startEnRoute() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put<any>(`${environment.backendUrl}/interventions/startEnRoute/${this.intervention.idInternalInter}`, { headers })
    .subscribe(
      (response) => { 
        if (response.success) {
          this.enRouteClicked = true;
          localStorage.setItem(`enRouteClicked_${this.intervention.idInternalInter}`, JSON.stringify(true));
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );

  }

  arrivedAtCU() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put<any>(`${environment.backendUrl}/interventions/arrivedAtCU/${this.intervention.idInternalInter}`, { headers })
    .subscribe(
      (response) => { 
        if (response.success) {
          this.arrivedAtCUClicked = true;
          localStorage.setItem(`arrivedAtCUClicked_${this.intervention.idInternalInter}`, JSON.stringify(true));
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  
  getServiceLink(): string[] {
    if (this.intervention.status.id === 2 || this.intervention.status.id === 3) {
      return ['/service-report', this.intervention.idInternalInter.toString()];
    } else if (this.intervention.status.id === 1) {
      return ['/check-service-tag', this.intervention.idInternalInter];
    } else {
      return ['/intervention'];
    }
  }

  ngOnInit(): void {
    this.intervention = this.route.snapshot.data['intervention'];
    const localStorageEnRoute = localStorage.getItem(`enRouteClicked_${this.intervention.idInternalInter}`);
    this.enRouteClicked = localStorageEnRoute ? JSON.parse(localStorageEnRoute) : false;
    const localStorageArrived = localStorage.getItem(`arrivedAtCUClicked_${this.intervention.idInternalInter}`);
    this.arrivedAtCUClicked = localStorageArrived ? JSON.parse(localStorageArrived) : false;  
  }

}

