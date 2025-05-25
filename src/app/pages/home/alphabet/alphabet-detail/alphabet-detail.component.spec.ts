import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabetDetailComponent } from './alphabet-detail.component';

describe('AlphabetDetailComponent', () => {
  let component: AlphabetDetailComponent;
  let fixture: ComponentFixture<AlphabetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlphabetDetailComponent]
    });
    fixture = TestBed.createComponent(AlphabetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
