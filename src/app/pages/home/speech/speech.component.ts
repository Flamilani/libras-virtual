import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css']
})
export class SpeechComponent implements OnDestroy {
  text = '';
  recognition: any;
  isListening = false;

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

      this.recognition.onend = () => {
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

  startRecognition() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  stopRecognition() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
}
