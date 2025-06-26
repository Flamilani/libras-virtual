import {
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Keywords } from '../../constants/keywords.constant';
import { ToneBarComponent } from '../tone-bar/tone-bar.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@Component({
    selector: 'app-speech-reader',
    templateUrl: './speech-reader.component.html',
    styleUrls: ['./speech-reader.component.css'],
    standalone: true,
    imports: [
        BootstrapIconsModule,
        ReactiveFormsModule,
        ToneBarComponent,
    ],
})
export class SpeechReaderComponent implements OnInit, OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;

  isMobile: boolean = true;

  transcript: { textSpeech: string; style: string }[] = [];

  textSpeech = '';
  displayText = '';

  recognition: any;
  isListening = false;
  isSpeaking = false;

  fontSize = 15;
  displayedValue!: string;
  showKeywords = true;

  speechForm!: FormGroup;
  keywords = Keywords;

  pitch = 1;
  showTone = false;
  toneColorClass = '';
  toneLabel = '';
  baseScale = 1;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.speechForm = this.fb.group({
      textSpeech: [''],
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  updateFullText() {
    const fullText = this.transcript.map((t) => t.textSpeech).join(' ');
    this.textControl?.setValue(fullText);
  }

  get textControl() {
    return this.speechForm.get('textSpeech');
  }

  isKeywordUsed(word: string): boolean {
    const current = (this.textControl?.value || '').toLowerCase();
    return current.includes(word.toLowerCase());
  }

  addKeyword(word: string) {
    console.log('Adicionando palavra:', word);
    const current = this.textControl?.value || '';
    this.textControl?.setValue((current + ' ' + word).trim());
    // this.focusTextArea();
  }

  speak() {
    const texto = this.textControl?.value;
    if (!texto) return;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(texto);
    console.log(utterance);

    utterance.lang = 'pt-BR';
    utterance.pitch = this.pitch;
    this.isSpeaking = true;

    utterance.onstart = () => {
      this.ngZone.run(() => {
        this.updateToneVisual();
        this.showTone = true;
      });
    };

    utterance.onend = () => {
      this.ngZone.run(() => {
        this.isSpeaking = false;
        this.showTone = false;
      });
    };

    utterance.onerror = () => {
      this.ngZone.run(() => {
        this.isSpeaking = false;
        this.showTone = false;
      });
    };

    speechSynthesis.speak(utterance);
  }

  toggleRecognition() {
    this.isListening ? this.stopRecognition() : this.startRecognition();
  }

  startRecognition() {
    if (!this.isListening) {
      this.textSpeech = '';
      this.transcript = [];
      this.isListening = true;
      this.recognition.start();
      this.focusTextArea();
    }
  }

  stopRecognition() {
    if (this.isListening) {
      this.isListening = false;
      this.recognition.stop();
      this.resetSpeech();
    }
  }

  resetSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.showTone = false;
  }

  focusTextArea() {
    setTimeout(() => {
      this.textArea?.nativeElement?.focus();
    }, 0);
  }

  clearText() {
    this.textControl?.setValue('');
    this.transcript = [];
    this.focusTextArea();
    this.resetSpeech();
  }

  increaseFontSize() {
    if (this.fontSize < 75) {
      this.fontSize += 5;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 15) {
      this.fontSize -= 5;
    }
  }

  updateToneVisual() {
    if (this.pitch < 0.9) {
      this.baseScale = 0.7;
      this.toneColorClass = 'tone-low';
    } else if (this.pitch <= 1.4) {
      this.baseScale = 1;
      this.toneColorClass = 'tone-normal';
    } else {
      this.baseScale = 1.3;
      this.toneColorClass = 'tone-high';
    }
  }

  stop() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      this.showTone = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.resetSpeech();
  }
}
