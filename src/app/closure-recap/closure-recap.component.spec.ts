import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureRecapComponent } from './closure-recap.component';

describe('ClosureRecapComponent', () => {
  let component: ClosureRecapComponent;
  let fixture: ComponentFixture<ClosureRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosureRecapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosureRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
