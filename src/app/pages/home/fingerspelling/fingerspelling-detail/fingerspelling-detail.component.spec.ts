import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FingerspellingDetailComponent } from './fingerspelling-detail.component';

describe('FingerspellingDetailComponent', () => {
  let component: FingerspellingDetailComponent;
  let fixture: ComponentFixture<FingerspellingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FingerspellingDetailComponent]
    });
    fixture = TestBed.createComponent(FingerspellingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
