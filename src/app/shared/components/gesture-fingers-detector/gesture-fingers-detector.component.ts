import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Camera } from '@mediapipe/camera_utils';
import { Hands } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';
import { StringsNamesUrl } from '../../constants/strings-url/strings-names';
import { processString } from '../../utils/convert-urls';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-gesture-fingers-detector',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent],
  templateUrl: './gesture-fingers-detector.component.html',
  styleUrl: './gesture-fingers-detector.component.css',
})
export class GestureFingersDetectorComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private camera!: Camera;
  private mediaStream: MediaStream | null = null;

  title = StringsNamesUrl.detector;
  link = `/${processString(StringsNamesUrl.visorComputacional)}`;

  detectedGesture: string = '';

  private lastGestureDetected: string = '';
  private animationFrameId: number | null = null;
  private lastResults: any = null;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => this.drawResults(results));

    /*    this.videoRef.nativeElement.onloadedmetadata = () => {
      this.adjustCanvasSize();
    }; */

    this.camera = new Camera(this.videoRef.nativeElement, {
      onFrame: async () => {
        this.adjustCanvasSize();
        await hands.send({ image: this.videoRef.nativeElement });
      },
      width: 640,
      height: 480,
    });

    this.camera.start();
  }

  scheduleDraw() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    this.animationFrameId = requestAnimationFrame(() => {
      if (this.lastResults) {
        this.drawResults(this.lastResults);
      }
    });
  }

  adjustCanvasSize(): void {
    const canvas = this.canvasRef.nativeElement;
    const video = this.videoRef.nativeElement;

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (!videoWidth || !videoHeight) return;

    // Tamanho real do canvas (pixels)
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    // Tamanho visual do canvas (estilo)
    /*     const rect = video.getBoundingClientRect();

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    canvas.style.left = `${rect.left}px`;
    canvas.style.top = `${rect.top}px`; */
  }

    drawResults(results: any) {
    const canvasEl = this.canvasRef.nativeElement;
    const canvasCtx = canvasEl.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    if (results.image) {
      canvasCtx.drawImage(results.image, 0, 0, canvasEl.width, canvasEl.height);
    }

    if (results.multiHandLandmarks?.length) {
      results.multiHandLandmarks.forEach((landmarks: any, index: any) => {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 2,
        });
        drawLandmarks(canvasCtx, landmarks, {
          color: '#FF0000',
          lineWidth: 2,
          radius: 4,
        });

        // 🟨 Debug visual com rótulos por dedo
          const drawLabel = (text: string, x: number, y: number) => {
          canvasCtx.font = '12px Arial';
          canvasCtx.fillStyle = 'black';
          canvasCtx.fillText(text, x, y);
        };

        const debugPoints = [
          { name: 'Polegar', index: 4 },
          { name: 'Indicador', index: 8 },
          { name: 'Médio', index: 12 },
          { name: 'Anelar', index: 16 },
          { name: 'Mindinho', index: 20 },
        ];

        debugPoints.forEach((point) => {
          const x = landmarks[point.index].x * canvasEl.width;
          const y = landmarks[point.index].y * canvasEl.height;
          const label = `${point.name}: x=${landmarks[point.index].x.toFixed(
            2
          )} y=${landmarks[point.index].y.toFixed(2)}`;
          drawLabel(label, x + 5, y - 5);
        });

        const handLabel = results.multiHandedness?.[index]?.label; // 'Left' or 'Right'
        const gesture = this.detectGesture(landmarks, handLabel);

        if (gesture && gesture !== this.lastGestureDetected) {
          this.detectedGesture = gesture;
          this.lastGestureDetected = gesture;
          this.speak(gesture);
        }
      });
    } else {
      // Quando a mão some da câmera
      this.detectedGesture = '';
      this.lastGestureDetected = '';
    }

    canvasCtx.restore();
  }


  detectGesture(landmarks: any, handLabel: string): string | null {
    if (this.detectJoinha(landmarks) && handLabel === 'Right')
      return '👍 Joinha';
    if (this.detectJoinha(landmarks) && handLabel === 'Left')
      return '👍 Joinha';
    if (this.detectJoinhaInvertido(landmarks) && handLabel === 'Right')
      return '👎 Não Curtir';
    if (this.detectJoinhaInvertido(landmarks) && handLabel === 'Left')
      return '👎 Não Curtir';
    return null;
  }

  // === GESTURES ===

  detectJoinha(landmarks: any): boolean {
    return (
      this.areFingersFolded(landmarks) &&
      landmarks[4].y < landmarks[3].y &&
      landmarks[4].y < landmarks[0].y &&
      Math.abs(landmarks[4].x - landmarks[0].x) < 0.15
    );
  }

  detectJoinhaInvertido(landmarks: any): boolean {
    return (
      this.areFingersFolded(landmarks) &&
      landmarks[4].y > landmarks[3].y &&
      landmarks[4].y > landmarks[0].y &&
      Math.abs(landmarks[4].x - landmarks[0].x) < 0.15
    );
  }

  detectLetraA(landmarks: any): boolean {
    return this.areFingersFolded(landmarks) && landmarks[4].x < landmarks[3].x;
  }

  detectLetraB(landmarks: any): boolean {
    return (
      this.areFingersExtended(landmarks) &&
      landmarks[4].y > landmarks[3].y &&
      Math.abs(landmarks[4].x - landmarks[2].x) < 0.06
    );
  }

    detectOi(landmarks: any): boolean {
    return (
      this.areFingersExtended(landmarks) &&
      this.isFingerExtended(4, 3, landmarks)
    );
  }

  detectAjuda(landmarks: any): boolean {
    return (
      this.isFingerExtended(8, 6, landmarks) &&
      this.isFingerExtended(4, 3, landmarks) &&
      this.isFingerFolded(12, 10, landmarks) &&
      this.isFingerFolded(16, 14, landmarks) &&
      this.isFingerFolded(20, 18, landmarks)
    );
  }

  isFingerFolded(tip: number, base: number, landmarks: any): boolean {
    const dx = landmarks[tip].x - landmarks[base].x;
    const dy = landmarks[tip].y - landmarks[base].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 0.1;
  }

  isFingerExtended(tip: number, base: number, landmarks: any): boolean {
    const dx = landmarks[tip].x - landmarks[base].x;
    const dy = landmarks[tip].y - landmarks[base].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance > 0.15;
  }

  areFingersFolded(landmarks: any): boolean {
    return (
      this.isFingerFolded(8, 5, landmarks) &&
      this.isFingerFolded(12, 9, landmarks) &&
      this.isFingerFolded(16, 13, landmarks) &&
      this.isFingerFolded(20, 17, landmarks)
    );
  }

  areFingersExtended(landmarks: any): boolean {
    return (
      this.isFingerExtended(8, 5, landmarks) &&
      this.isFingerExtended(12, 9, landmarks) &&
      this.isFingerExtended(16, 13, landmarks) &&
      this.isFingerExtended(20, 17, landmarks)
    );
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

    ngOnDestroy(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }

    if (this.camera) {
      this.camera.stop();
    }
  }
}
