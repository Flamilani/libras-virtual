import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechReaderComponent } from './speech-reader.component';

describe('SpeechReaderComponent', () => {
  let component: SpeechReaderComponent;
  let fixture: ComponentFixture<SpeechReaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeechReaderComponent]
    });
    fixture = TestBed.createComponent(SpeechReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
