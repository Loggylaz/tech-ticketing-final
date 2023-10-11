import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.scss']
})
export class ServiceReportComponent implements OnInit {
  intervention: any;
  localComment: any;
  localSignature: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {

        this.intervention = this.route.snapshot.data['intervention'];
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
        if (this.intervention.status.id === 1) {
          this.router.navigateByUrl('/intervention'); 
        }

  }

  previous(): void {
    this.location.back();
  }

  goBack(): void {
    this.router.navigate(['/intervention']);
  }

}
