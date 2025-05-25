import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsGrettingComponent } from './cards-gretting.component';

describe('CardsGrettingComponent', () => {
  let component: CardsGrettingComponent;
  let fixture: ComponentFixture<CardsGrettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsGrettingComponent]
    });
    fixture = TestBed.createComponent(CardsGrettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
