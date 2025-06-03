import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialExpressionComponent } from './facial-expression.component';

describe('FacialExpressionComponent', () => {
  let component: FacialExpressionComponent;
  let fixture: ComponentFixture<FacialExpressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacialExpressionComponent]
    });
    fixture = TestBed.createComponent(FacialExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
