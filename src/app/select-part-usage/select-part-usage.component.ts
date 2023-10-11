import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { InterventionService } from '../services/intervention.service';

@Component({
  selector: 'app-select-part-usage',
  templateUrl: './select-part-usage.component.html',
  styleUrls: ['./select-part-usage.component.scss']
})
export class SelectPartUsageComponent implements OnInit {

  intervention: any;
  test: any;

  constructor(    
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private interventionService: InterventionService) { }

  ngOnInit(): void {

    this.intervention = this.route.snapshot.data['intervention'];
    this.initializeCheckboxState();

    if (this.intervention.status.id === 2 || this.intervention.status.id === 3) {
      this.router.navigateByUrl('/intervention');
    }
  }

  initializeCheckboxState() {
    if (this.intervention && this.intervention.interventionParts) {
      this.intervention.interventionParts.forEach((interventionPart: any) => {
        const storedState = localStorage.getItem(`part_${interventionPart.id}_isChecked`);
        interventionPart.partUsage = storedState === 'true';
      });
    }
    console.log(localStorage);
  }

  saveChanges() {
    if (this.intervention && this.intervention.interventionParts) {
      this.intervention.interventionParts.forEach((interventionPart: any) => {
        localStorage.setItem(`part_${interventionPart.id}_isChecked`, interventionPart.partUsage.toString());
      });
    }
    console.log(localStorage);
  }

  previous(): void {
    this.location.back();
  }

  goBack(): void {
    this.router.navigate(['/intervention']);
  }

}
