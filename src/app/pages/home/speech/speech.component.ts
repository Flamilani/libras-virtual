import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.css'],
})
export class SpeechComponent implements OnInit, OnDestroy {
  @ViewChild('textArea') textArea!: ElementRef;

  transcript: { textSpeech: string; style: string }[] = [];

  audioContext!: AudioContext;
  analyser!: AnalyserNode;
  dataArray!: Uint8Array;
  microphone!: MediaStreamAudioSourceNode;
  mediaStream!: MediaStream;

  textSpeech = '';

  recognition: any;
  isListening = false;
  isSpeaking = false;

  fontSize = 20;
  displayedValue!: string;
  showKeywords = true;

  speechForm!: FormGroup;

  keywords = ['Olá, tudo bem?', 'Bom dia!', 'Obrigado', 'Até logo'];

  constructor(private fb: FormBuilder) {
    this.speechForm = this.fb.group({
      textSpeech: [''],
    });
  }

  ngOnInit(): void {
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
          const transcriptText = event.results[i][0].transcript.trim();
          console.log(transcriptText);
          if (event.results[i].isFinal) {
            this.textSpeech += transcriptText + ' ';
          } else {
            interimTranscript += transcriptText + ' ';
          }
        }

        const fullText = (this.textSpeech + interimTranscript).trim();
        this.textControl?.setValue(fullText);
      };

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento:', event.error);
        this.isListening = false;
      };
    } else {
      alert('Reconhecimento de fala não suportado neste navegador.');
    }
  }

  get textControl() {
    return this.speechForm.get('textSpeech');
  }

  isKeywordUsed(word: string): boolean {
    const current = (this.textControl?.value || '').toLowerCase();
    return current.includes(word.toLowerCase());
  }

  addKeyword(word: string) {
    const current = this.textControl?.value || '';
    this.textControl?.setValue((current + ' ' + word).trim());
    this.focusTextArea();
  }

  getStyleByVolume(): string {
    const volume = this.getCurrentVolume();

    if (volume > 40) {
      return 'loud'; // 🔴 Alto
    } else if (volume > 20) {
      return 'medium'; // 🟢 Médio
    } else {
      return 'soft'; // 🔵 Baixo
    }
  }

  initVolumeMeter() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.mediaStream = stream;
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.analyser.fftSize = 512;
      this.dataArray = new Uint8Array(this.analyser.fftSize);

      this.microphone.connect(this.analyser);
      this.monitorVolume();
    });
  }

  monitorVolume() {
    if (!this.isListening) return;

    this.analyser.getByteTimeDomainData(this.dataArray);
    requestAnimationFrame(() => this.monitorVolume());
  }

  getCurrentVolume(): number {
    if (!this.analyser) return 0;

    this.analyser.getByteTimeDomainData(this.dataArray);
    let sum = 0;
    for (const v of this.dataArray) {
      const val = v - 128;
      sum += val * val;
    }
    return Math.sqrt(sum / this.dataArray.length);
  }

  stopVolumeMeter() {
    if (this.audioContext) {
      this.audioContext.close();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }

  speak() {
    const texto = this.textControl?.value;
    if (!texto) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    this.isSpeaking = true;

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    speechSynthesis.speak(utterance);
  }

  toggleRecognition() {
    this.isListening ? this.stopRecognition() : this.startRecognition();
  }

  startRecognition() {
    if (this.recognition && !this.isListening) {
      this.textSpeech = '';
      this.transcript = [];
      this.recognition.start();
      this.isListening = true;
      this.focusTextArea();
    }
  }

  stopRecognition() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
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
    this.transcript = [];
    this.focusTextArea();
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

  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.stopVolumeMeter();
    this.resetSpeech();
  }
}
