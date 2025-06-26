import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechKeywordsComponent } from './speech-keywords.component';

describe('SpeechKeywordsComponent', () => {
  let component: SpeechKeywordsComponent;
  let fixture: ComponentFixture<SpeechKeywordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SpeechKeywordsComponent]
});
    fixture = TestBed.createComponent(SpeechKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
