import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureClosureComponent } from './signature-closure.component';

describe('SignatureClosureComponent', () => {
  let component: SignatureClosureComponent;
  let fixture: ComponentFixture<SignatureClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureClosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
