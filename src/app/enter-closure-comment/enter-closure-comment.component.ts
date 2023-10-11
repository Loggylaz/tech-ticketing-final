import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';

@Component({
  selector: 'app-enter-closure-comment',
  templateUrl: './enter-closure-comment.component.html',
  styleUrls: ['./enter-closure-comment.component.scss']
})
export class EnterClosureCommentComponent implements OnInit {
  commentText: string = '';
  intervention: any;
  isCommentEmpty: boolean = true;
  isSignatureDone: boolean = false;
  biosVersion: any;
  biosVersionDone: boolean = false;
  interventionOutcome: any;
  isOutcomeSelected: boolean = false;

  @ViewChild('signature') 
  public signaturePad:any ;


   public signaturePadOptions: NgSignaturePadOptions = { 
    minWidth: 5,
    canvasWidth: 600,
    canvasHeight: 400
  };

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 5); 
  }

  onOutcomeChange(): void { 
      localStorage.setItem(`outcome_${this.intervention.idInternalInter}`, this.interventionOutcome === 'true' ? 'OK' : 'NOK');
      this.isOutcomeSelected = true;
    }

  submitComment() {
    console.log('Commentaire soumis :', localStorage);
    localStorage.setItem(`signature_${this.intervention.idInternalInter}`, this.signaturePad.toDataURL()); 
    localStorage.setItem(`outcome_${this.intervention.idInternalInter}`, this.interventionOutcome === 'true' ? 'OK' : 'NOK');
  }
  constructor(
    private location: Location,     
    private router: Router,
    private route: ActivatedRoute
    ) { }


  ngOnInit(): void {

    this.intervention = this.route.snapshot.data['intervention'];
    const savedComment = localStorage.getItem(`savedComment_${this.intervention.idInternalInter}`);
    if (savedComment) {
      this.commentText = savedComment;
      this.checkCommentEmpty();
    }

    const savedSignature = localStorage.getItem(`signature_${this.intervention.idInternalInter}`);
    if (savedSignature) {
      this.isSignatureDone = true;
    }

  const savedOutcome = localStorage.getItem(`outcome_${this.intervention.idInternalInter}`);
  if (savedOutcome) {
    this.isOutcomeSelected = true;
    this.interventionOutcome = savedOutcome === 'OK' ? 'true' : 'false';
  } else {
    this.interventionOutcome = null;
    this.isOutcomeSelected = false;
  }

  if (this.intervention.status.id === 2 || this.intervention.status.id === 3) {
    this.router.navigateByUrl('/intervention');
  }

  }
  
  
  public clear(): void {
    this.signaturePad.clear();
    this.isSignatureDone = false;
 }

  saveSignature() {
    const signatureDataUrl = this.signaturePad.toDataURL();
    localStorage.setItem(`signature_${this.intervention.idInternalInter}`, signatureDataUrl);
  }

  drawComplete(event: MouseEvent | Touch) {
    console.log('Completed drawing', event);
    console.log(this.signaturePad.toDataURL());
    this.isSignatureDone = true;
  }

  drawStart(event: MouseEvent | Touch) {
    console.log('Start drawing', event);
    this.isSignatureDone = true;
  }

  onCommentInput() {
    this.checkCommentEmpty();
    localStorage.setItem(`savedComment_${this.intervention.idInternalInter}`, this.commentText);
  }

  checkCommentEmpty() {
    this.isCommentEmpty = this.commentText.trim() === '';
  }

  previous(): void {
    this.location.back();
  }

  goBack(): void {
    this.router.navigate(['/intervention']); 
  }

}
