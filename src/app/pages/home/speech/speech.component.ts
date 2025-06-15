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
  isSpeaking = false;

  fontSize = 20;
  displayedValue!: string;
  showKeywords = true;

  speechForm!: FormGroup;

  keywords = ['Olá, tudo bem?', 'Bom dia!', 'Obrigado', 'Até logo'];

  constructor(private fb: FormBuilder) {
    console.log('Iniciando reconhecimento de fala...');
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

        const currentVolume = this.getCurrentVolume();
        const style = this.getStyleByVolume(currentVolume);

        /*         for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptText = result[0].transcript.trim();

          this.transcript.push({
            textSpeech: transcriptText,
            style: style,
          });

          if (result.isFinal) {
            this.textSpeech += transcriptText + ' ';
          }
        } */

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.textSpeech += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        this.displayText = this.textSpeech + interimTranscript;

        this.updateFullText();
      };

      this.recognition.onstart = () => {
        this.isListening = true;
        this.initVolumeMeter();
      };

      this.recognition.onend = () => {
        console.warn('Reconhecimento parado');
        this.isListening = false;
        this.stopVolumeMeter();

        if (this.isListening) {
          console.log('Reiniciando reconhecimento...');
          this.recognition.start();
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Erro no reconhecimento:', event.error);
        this.isListening = false;
        this.stopVolumeMeter();
      };
    } else {
      alert('Reconhecimento de fala não suportado neste navegador.');
    }

    this.speechForm = this.fb.group({
      textSpeech: [''],
    });
  }

  ngOnInit(): void {}

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
    this.focusTextArea();
  }

  speak() {
    console.log('Lendo texto:', this.textControl?.value);
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
    if (!this.isListening) {
      this.textSpeech = '';
      this.transcript = [];
      this.isListening = true;
      this.recognition.start();
      this.initVolumeMeter();
      this.focusTextArea();
    }
  }

  stopRecognition() {
    if (this.isListening) {
      this.isListening = false;
      this.recognition.stop();
      this.stopVolumeMeter();
      this.resetSpeech();
    }
    this.stopAllAudio();
  }

  getStyleByVolume(volume: number): string {
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
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().then(() => {
        this.audioContext = undefined as any;
      });
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = undefined as any;
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
    this.resetSpeech();
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

  stopAllAudio() {
    console.log('Parando reconhecimento e microfone...');

    if (this.recognition) {
      try {
        this.recognition.stop();
        console.log('Reconhecimento parado.');
      } catch (e) {
        console.warn('Erro ao parar reconhecimento:', e);
      }
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext
        .close()
        .then(() => {
          console.log('AudioContext fechado.');
        })
        .catch((e) => {
          console.warn('Erro ao fechar AudioContext:', e);
        });
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
        console.log('Track parada:', track);
      });
      this.mediaStream = undefined as any;
    }

    this.isListening = false;
  }
  ngOnDestroy() {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.stopVolumeMeter();
    this.resetSpeech();
    this.stopAllAudio();
  }
}
