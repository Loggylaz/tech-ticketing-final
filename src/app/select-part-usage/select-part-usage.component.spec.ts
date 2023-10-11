import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPartUsageComponent } from './select-part-usage.component';

describe('SelectPartUsageComponent', () => {
  let component: SelectPartUsageComponent;
  let fixture: ComponentFixture<SelectPartUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPartUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPartUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
