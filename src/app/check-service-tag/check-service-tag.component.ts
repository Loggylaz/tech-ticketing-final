import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-check-service-tag',
  templateUrl: './check-service-tag.component.html',
  styleUrls: ['./check-service-tag.component.scss']
})
export class CheckServiceTagComponent implements OnInit {
  intervention: any;
  scannedServiceTag: string = '';
  isValid: boolean = false;
  tagStatus: 'Match' | 'Wrong' | 'NoAction' = 'NoAction';

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.intervention = this.route.snapshot.data['intervention'];

    if (this.intervention.status.id === 2 || this.intervention.status.id === 3) {
      this.router.navigateByUrl('/intervention');
    }

    this.loadStoredData(this.intervention.idInternalInter);
  }

  previous(): void {
    this.location.back();
  }

  goBack(): void {
    this.router.navigate(['/intervention']);
  }

  openScannerModal() {
    const modalRef = this.modalService.openScannerModal();

    modalRef.componentInstance.onSubmit.subscribe((result: any) => {
      console.log("test: ", result);
      if (result) {
        this.scannedServiceTag = result;
        this.validateInput();
      }
      console.log('Résultat de la modal:', result);
    });
  }

  handleScannedResult(result: any): void {
    this.scannedServiceTag = result;
    this.validateInput();
  }

  handleManualEntryResult(result: any): void {
    this.scannedServiceTag = result;
    this.validateInput();
  }

  validateInput(): void {
    if (this.scannedServiceTag === this.intervention.serialNumber) {
      this.tagStatus = 'Match';
      this.isValid = true;
    } else {
      this.tagStatus = 'Wrong';
      this.isValid = false;
    }

    localStorage.setItem(
      `scannedServiceTag_${this.intervention.idInternalInter}`,
      this.scannedServiceTag
    );
  }

  loadStoredData(interventionId: number): void {
    const storedScannedServiceTag = localStorage.getItem(
      `scannedServiceTag_${interventionId}`
    );
    if (storedScannedServiceTag) {
      this.scannedServiceTag = storedScannedServiceTag;
      this.validateInput();
    }
  }

  openManualEntryModal(): void {
    const modalRef = this.modalService.openManualEntryModal();

    modalRef.componentInstance.onSubmit.subscribe((result: any) => {
      console.log("test: ", result);
      if (result) {
        this.scannedServiceTag = result;
        this.validateInput();
      }
    });
  }
}