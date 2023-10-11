import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckServiceTagComponent } from './check-service-tag.component';

describe('CheckServiceTagComponent', () => {
  let component: CheckServiceTagComponent;
  let fixture: ComponentFixture<CheckServiceTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckServiceTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckServiceTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
