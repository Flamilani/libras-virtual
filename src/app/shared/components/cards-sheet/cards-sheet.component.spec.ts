import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSheetComponent } from './cards-sheet.component';

describe('CardsSheetComponent', () => {
  let component: CardsSheetComponent;
  let fixture: ComponentFixture<CardsSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsSheetComponent]
    });
    fixture = TestBed.createComponent(CardsSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
