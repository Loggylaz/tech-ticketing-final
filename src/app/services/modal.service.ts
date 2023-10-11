import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ScannerModalComponent } from '../scanner-modal/scanner-modal.component';
import { ManualEntryModalComponent } from '../manual-entry-modal/manual-entry-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openScannerModal(): NgbModalRef {
    return this.modalService.open(ScannerModalComponent);
  }

  openManualEntryModal(): NgbModalRef {
    return this.modalService.open(ManualEntryModalComponent);
  }
}
