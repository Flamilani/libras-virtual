import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLetterComponent } from './modal-letter.component';

describe('ModalLetterComponent', () => {
  let component: ModalLetterComponent;
  let fixture: ComponentFixture<ModalLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLetterComponent]
    });
    fixture = TestBed.createComponent(ModalLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
