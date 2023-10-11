import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterClosureCommentComponent } from './enter-closure-comment.component';

describe('EnterClosureCommentComponent', () => {
  let component: EnterClosureCommentComponent;
  let fixture: ComponentFixture<EnterClosureCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterClosureCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterClosureCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
