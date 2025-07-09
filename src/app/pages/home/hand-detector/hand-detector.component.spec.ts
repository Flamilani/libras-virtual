import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandDetectorComponent } from './hand-detector.component';

describe('HandDetectorComponent', () => {
  let component: HandDetectorComponent;
  let fixture: ComponentFixture<HandDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandDetectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
