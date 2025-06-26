import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@Component({
    selector: 'app-speech-transcriber',
    templateUrl: './speech-transcriber.component.html',
    styleUrls: ['./speech-transcriber.component.css'],
    standalone: true,
    imports: [
        BootstrapIconsModule,
        ReactiveFormsModule,
        NgClass,
        FormsModule,
    ],
})
export class SpeechTranscriberComponent implements OnInit, OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;

  isMobile: boolean = true;

  textSpeech = '';

  recognition: any;
  isListening = false;
  isSpeaking = false;

  fontSize = 15;
  speechForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = true;
      this.recognition.interimResults = false;

      this.recognition.onresult = (event: any) => {
       let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.textSpeech += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = () => {
        this.isListening = false;


        if (this.isListening) {
          this.recognition.start();
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento:', event.error);
        this.isListening = false;

      };
    } else {
      alert('Reconhecimento de fala não suportado neste navegador.');
    }

    this.speechForm = this.fb.group({
      textSpeech: [''],
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }
/*
  updateFullText() {
    const fullText = this.transcript.map((t) => t.textSpeech).join(' ');
    this.textControl?.setValue(fullText);
  } */

  get textControl() {
    return this.speechForm.get('textSpeech');
  }

  toggleRecognition() {
    this.isListening ? this.stopRecognition() : this.startRecognition();
  }


  startRecognition() {
    if (!this.isListening) {
      this.textSpeech = '';
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
  }

  focusTextArea() {
    setTimeout(() => {
      this.textArea?.nativeElement?.focus();
    }, 0);
  }

  clearText() {
    this.textControl?.setValue('');
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnDestroy() {
    if (this.isListening) {
      this.recognition.stop();
    }
    this.resetSpeech();
  }
}
