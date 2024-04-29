import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerspellingComponent } from './fingerspelling.component';

describe('FingerspellingComponent', () => {
  let component: FingerspellingComponent;
  let fixture: ComponentFixture<FingerspellingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FingerspellingComponent]
    });
    fixture = TestBed.createComponent(FingerspellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
