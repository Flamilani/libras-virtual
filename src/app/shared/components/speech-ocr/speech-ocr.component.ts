import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'app-speech-ocr',
  templateUrl: './speech-ocr.component.html',
  styleUrls: ['./speech-ocr.component.css'],
})
export class SpeechOcrComponent implements OnInit {
  @ViewChild('textArea') textArea!: ElementRef;

  isMobile: boolean = true;
  textResult = '';
  fontSize = 20;
  isProcessing = false;
  isSpeaking = false;
  utterance: SpeechSynthesisUtterance | null = null;
  speechForm!: FormGroup;
  isListening = false;

  constructor(private fb: FormBuilder) {
    this.speechForm = this.fb.group({
      textResult: [''],
      inputFile: [''],
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isProcessing = true;
      Tesseract.recognize(file, 'por', {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          this.textResult = text;
          this.isProcessing = false;
        })
        .catch((err) => {
          console.error(err);
          this.isProcessing = false;
        });
    }
  }

  get textControl() {
    return this.speechForm.get('textResult');
  }

  get inputFile() {
    return this.speechForm.get('inputFile');
  }

  increaseFontSize() {
    if (this.fontSize < 80) {
      this.fontSize += 10;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 20) {
      this.fontSize -= 10;
    }
  }

  speakText() {
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      return;
    }
    this.utterance = new SpeechSynthesisUtterance(this.textResult);
    this.utterance.lang = 'pt-BR';
    this.utterance.onend = () => {
      this.isSpeaking = false;
    };
    window.speechSynthesis.speak(this.utterance);
    this.isSpeaking = true;
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
    this.inputFile?.setValue('');
    this.focusTextArea();
    this.resetSpeech();
  }
}
