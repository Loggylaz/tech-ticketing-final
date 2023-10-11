import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ScannerQRCodeConfig,  NgxScannerQrcodeComponent, ScannerQRCodeResult, ScannerQRCodeSelectedFiles, NgxScannerQrcodeService, ScannerQRCodeDevice } from 'ngx-scanner-qrcode';
import { delay } from 'rxjs';

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modal.component.html',
  styleUrls: ['./scanner-modal.component.scss']
})
export class ScannerModalComponent implements AfterViewInit{ 
  @Output() onSubmit = new EventEmitter<string>();

scannedServiceTag: string = '';

constructor(public activeModal: NgbActiveModal, private qrcode: NgxScannerQrcodeService,/* private dialogRef: MatDialogRef<ScannerModalComponent>*/) {}

@ViewChild(NgxScannerQrcodeComponent, { static: false }) scanner?: NgxScannerQrcodeComponent; // Accès au scanner

ngOnInit(): void {
  this.validateInput();
}

validateInput(): void {

}

submit() {
  this.handle(this.action, 'stop');
  this.onSubmit.emit(this.scannedServiceTag)
  this.activeModal.close(this.scannedServiceTag);
  
}

close() {
  this.handle(this.action, 'stop');
  this.activeModal.close();
  
 // this.dialogRef.close();
}



public config: ScannerQRCodeConfig = {
  constraints: {
    video: {
      width: window.innerWidth 
    }
  },
};

public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];


  @ViewChild('action')
  action!: NgxScannerQrcodeComponent;

ngAfterViewInit(): void {
  this.action.isReady.pipe(delay(1000)).subscribe(() => {
    this.handle(this.action, 'start');
  });
}

public onEvent(e: ScannerQRCodeResult[], action?: any): void {
  e?.length && action && action.pause(); // Detect once and pause scan!

  let binArrayToString = function(binArray: string | any[] | Int8Array) {
    let str = "";
    for (let i = 0; i < binArray.length; i++) {        
        str += String.fromCharCode(parseInt(binArray[i]));
    }
    return str;
}
  console.log('utf8ArrayToString',binArrayToString(e[0].data));
  this.scannedServiceTag = binArrayToString(e[0].data);
  this.submit()
}

public handle(action: any, fn: string): void {
  const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
    // front camera or back camera check here!
    const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
    action.playDevice(device ? device.deviceId : devices[0].deviceId);
  }

  if (fn === 'start') {
    action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
  } else {
    action[fn]().subscribe((r: any) => console.log(fn, r), alert);
  }
}

public onSelects(files: any): void {
  this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
    this.qrCodeResult = res;
  });
}

}