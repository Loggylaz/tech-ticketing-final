import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manual-entry-modal',
  templateUrl: './manual-entry-modal.component.html',
  styleUrls: ['./manual-entry-modal.component.scss']
})
export class ManualEntryModalComponent {
  @Output() onSubmit = new EventEmitter<string>();
  serviceTag: string = '';
  isValid: boolean = false;
  scannedServiceTag: string = "";

  constructor(public activeModal: NgbActiveModal,
    //  @Inject(MAT_DIALOG_DATA) public intervention: any  
     ) {}

  validateInput(): void {
    if (this.serviceTag === this.scannedServiceTag && this.serviceTag !== '') {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

  close() {
    this.activeModal.close();
   // this.dialogRef.close();
  }

  submit(): void {
    if (this.isValid) {
      this.onSubmit.emit(this.scannedServiceTag.toUpperCase())
      this.activeModal.close(this.scannedServiceTag);

    //  this.dialogRef.close(this.scannedServiceTag);
    }
  }
}

