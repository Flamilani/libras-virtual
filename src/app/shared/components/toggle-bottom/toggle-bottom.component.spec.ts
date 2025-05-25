import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBottomComponent } from './toggle-bottom.component';

describe('ToggleBottomComponent', () => {
  let component: ToggleBottomComponent;
  let fixture: ComponentFixture<ToggleBottomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleBottomComponent]
    });
    fixture = TestBed.createComponent(ToggleBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
