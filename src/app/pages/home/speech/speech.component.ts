import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css'],
})
export class SpeechComponent implements OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;

  text = '';
  recognition: any;
  isListening = false;
  fontSize: number = 20;
  displayedValue!: string;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'pt-BR';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.text += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
      };

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = (event: any) => {
        console.error('Erro no reconhecimento:', event.error);
        this.isListening = false;
      };
    } else {
      alert('Reconhecimento de fala não suportado neste navegador.');
    }
  }

  speak() {
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
  }

  toggleRecognition() {
    if (this.isListening) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }

  startRecognition() {
    if (this.recognition && !this.isListening) {
      this.recognition.start();
      this.isListening = true;
      this.focusTextArea();
    }
  }

  stopRecognition() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  focusTextArea() {
    setTimeout(() => {
      this.textArea?.nativeElement?.focus();
    }, 0);
  }

  clearText() {
    this.text = '';
    this.focusTextArea();
  }

  increaseFontSize() {
    if (this.fontSize < 160) {
      this.fontSize += 20; // Aumenta o tamanho da fonte em 2 pixels
    }
  }

  // Função para diminuir o tamanho da fonte
  decreaseFontSize() {
    if (this.fontSize > 80) {
      // Limite mínimo de tamanho da fonte
      this.fontSize -= 20; // Diminui o tamanho da fonte em 2 pixels
    }
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
