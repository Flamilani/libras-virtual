import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as Tesseract from 'tesseract.js';
import { ToneBarComponent } from '../tone-bar/tone-bar.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@Component({
    selector: 'app-speech-ocr',
    templateUrl: './speech-ocr.component.html',
    styleUrls: ['./speech-ocr.component.css'],
    standalone: true,
    imports: [
        BootstrapIconsModule,
        ReactiveFormsModule,
        ToneBarComponent,
    ],
})
export class SpeechOcrComponent implements OnInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('textArea') textArea!: ElementRef;

  isMobile: boolean = true;
  textResult = '';
  fontSize = 15;
  isProcessing = false;
  isSpeaking = false;

  speechForm!: FormGroup;
  isListening = false;
  cameraOn = false;

  pitch = 1;
  showTone = false;
  toneColorClass = '';
  toneLabel = '';
  baseScale = 1;

  private stream: MediaStream | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.speechForm = this.fb.group({
      textResult: [''],
      inputFile: [''],
    });
  }

  ngOnInit(): void {
    this.checkIfMobile();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  startCamera() {
    this.cameraOn = true;
    setTimeout(() => {
      const videoEl = this.video?.nativeElement;
      if (!videoEl) {
        console.error('Elemento de vídeo não encontrado');
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          this.stream = stream;
          videoEl.srcObject = stream;
        })
        .catch((err) => {
          console.error('Erro ao acessar câmera', err);
          alert('Erro ao acessar câmera. Verifique permissões e dispositivo.');
          this.cameraOn = false;
        });
    }, 100);
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
      this.cameraOn = false;
    }
    this.cameraOn = false;
  }

  async capture() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      console.error('Contexto canvas não disponível');
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.isProcessing = true;

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      if (!blob) {
        console.error('Falha ao gerar imagem do canvas');
        return;
      }

      const result = await Tesseract.recognize(blob, 'por', {
        logger: (m) => console.log(m),
      });

      const texto = result.data.text;
      console.log('Texto OCR:', texto);
      this.speechForm.get('textResult')?.setValue(texto);
    } catch (error) {
      console.error('Erro no OCR:', error);
    } finally {
      this.isProcessing = false;
      this.stopCamera(); // 🔴 Sempre desliga após terminar
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isProcessing = true;
      Tesseract.recognize(file, 'por', {
        logger: (m) => console.log(m),
      })
        .then(({ data: { text } }) => {
          console.log('Texto OCR:', text);
          this.speechForm.get('textResult')?.setValue(text);
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
    if (this.fontSize < 85) {
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

    stop() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      this.showTone = false;
    }
  }
}
