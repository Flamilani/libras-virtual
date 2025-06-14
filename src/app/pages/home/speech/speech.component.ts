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
  displayText = '';
  recognition: any;
  isListening = false;

  fontSize: number = 20;
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
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript.trim();
          const style = this.getStyleByVolume();
          this.transcript.push({ textSpeech: transcriptText, style });
        }

        const fullText = this.transcript.map((t) => t.textSpeech).join(' ');
        this.textControl?.setValue(fullText);
      };

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.displayText = this.textSpeech;
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
    if (texto) {
      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'pt-BR';
      speechSynthesis.speak(utterance);
    }
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
    }
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
    this.stopVolumeMeter();
  }
}
