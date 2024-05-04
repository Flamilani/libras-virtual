import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialsComponent } from './initials.component';

describe('InitialsComponent', () => {
  let component: InitialsComponent;
  let fixture: ComponentFixture<InitialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialsComponent]
    });
    fixture = TestBed.createComponent(InitialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
