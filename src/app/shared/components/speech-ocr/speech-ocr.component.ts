import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
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

  private stream: MediaStream | null = null;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor(private fb: FormBuilder) {
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
    }
    this.cameraOn = false;
  }

  capture() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.isProcessing = true;

      canvas.toBlob((blob) => {
        if (blob) {
          Tesseract.recognize(blob, 'por', {
            logger: (m) => console.log(m),
          })
            .then(({ data: { text } }) => {
              this.textResult = text;
              this.isProcessing = false;
              this.stopCamera();
            })
            .catch((err) => {
              console.error(err);
              this.isProcessing = false;
            });
        }
      }, 'image/png');
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
    if (this.fontSize < 85) {
      this.fontSize += 5;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 15) {
      this.fontSize -= 5;
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
