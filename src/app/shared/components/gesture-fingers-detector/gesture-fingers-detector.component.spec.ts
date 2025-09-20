import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestureFingersDetectorComponent } from './gesture-fingers-detector.component';

describe('GestureFingersDetectorComponent', () => {
  let component: GestureFingersDetectorComponent;
  let fixture: ComponentFixture<GestureFingersDetectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestureFingersDetectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestureFingersDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
