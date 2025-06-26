import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechOcrComponent } from './speech-ocr.component';

describe('SpeechOcrComponent', () => {
  let component: SpeechOcrComponent;
  let fixture: ComponentFixture<SpeechOcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SpeechOcrComponent]
});
    fixture = TestBed.createComponent(SpeechOcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
