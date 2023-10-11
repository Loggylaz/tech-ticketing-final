import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-closure-recap',
  templateUrl: './closure-recap.component.html',
  styleUrls: ['./closure-recap.component.scss']
})
export class ClosureRecapComponent implements OnInit {
  intervention: any;
  localComment: any;
  localSignature: any;
  localOutcome: any;
  successMessage: string = ""; 
  errorMessage: string = ""; 
  timestampClosure: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private http: HttpClient
  ) {}

  ngOnInit(): void {



        this.intervention = this.route.snapshot.data['intervention'];
        this.localComment = localStorage.getItem(`savedComment_${this.intervention.idInternalInter}`);
        this.localSignature = localStorage.getItem(`signature_${this.intervention.idInternalInter}`);
        this.localOutcome = localStorage.getItem(`outcome_${this.intervention.idInternalInter}`);

        this.timestampClosure = Date.now();

        this.intervention.interventionParts.forEach((interventionPart: any) => {
          const localStorageKey = `part_${this.intervention.interventionParts.id}_isChecked`;
          const localStorageValue = localStorage.getItem(localStorageKey);
      
          if (localStorageValue !== null) {
            interventionPart.partUsage = localStorageValue === 'true';
          } else {

            interventionPart.partUsage = false;
          }
        });

        for (const part of this.intervention.interventionParts) {
          for (const part of this.intervention.interventionParts) {
            const localStorageKey = `part_${part.id}_isChecked`;
            const localStorageValue = localStorage.getItem(localStorageKey);
      
            if (localStorageValue !== null) {
              part.isChecked = localStorageValue === 'true';
            } else {
              part.isChecked = false;
            }
          }
        }
        if (this.intervention.status.id === 2 || this.intervention.status.id === 3) {
          this.router.navigateByUrl('/intervention');
        }
  }


 
  sendClosure() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
  

    this.intervention.closureComment = this.localComment;
    this.intervention.closureSignature = this.localSignature;
    this.intervention.outcome = this.localOutcome;
  

    this.intervention.interventionParts.forEach((interventionPart: any) => {
      const localStorageKey = `partUsage_${interventionPart.id}`;
      const localStorageValue = localStorage.getItem(localStorageKey);
  
      if (localStorageValue !== null) {
        interventionPart.partUsage = localStorageValue === 'true';
      } else {

        interventionPart.partUsage = false;
      }
    });

    this.http.put<any>(`${environment.backendUrl}/interventions/closure/${this.intervention.idInternalInter}`, this.intervention, { headers })
    .subscribe(
        (response) => {

          this.successMessage = 'Intervention closed successfully';
          localStorage.setItem(`savedComment_${this.intervention.idInternalInter}`, "");
          localStorage.setItem(`signature_${this.intervention.idInternalInter}`, "");
          localStorage.setItem(`outcome_${this.intervention.idInternalInter}`, "");
          this.intervention.interventionParts.forEach((interventionPart: any) => {
            const localStorageKey = `partUsage_${interventionPart.id}`;
            localStorage.setItem(localStorageKey, interventionPart.partUsage.toString());
          });


        },
        (error) => {
          this.errorMessage = 'Error closing intervention';

        }
      );
  }

  previous(): void {
    this.location.back();
  }

  goBack(): void {
    this.router.navigate(['/intervention']);
  }
  

}
