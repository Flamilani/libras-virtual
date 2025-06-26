import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechTranscriberComponent } from './speech-transcriber.component';

describe('SpeechTranscriberComponent', () => {
  let component: SpeechTranscriberComponent;
  let fixture: ComponentFixture<SpeechTranscriberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SpeechTranscriberComponent]
});
    fixture = TestBed.createComponent(SpeechTranscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
