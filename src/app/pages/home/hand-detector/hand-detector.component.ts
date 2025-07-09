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
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { processString } from 'src/app/shared/utils/convert-urls';

@Component({
  selector: 'app-hand-detector',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent],
  templateUrl: './hand-detector.component.html',
  styleUrl: './hand-detector.component.css',
})
export class HandDetectorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  private camera!: Camera;
  private mediaStream: MediaStream | null = null;

  title = StringsNamesUrl.detector;
  link = `/${processString(StringsNamesUrl.visorComputacional)}`;

  detectedGesture: string = '';

  private lastGestureDetected: string = '';

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

    this.camera = new Camera(this.video.nativeElement, {
      onFrame: async () => {
        await hands.send({ image: this.video.nativeElement });
      },
      width: 640,
      height: 480,
    });

    this.camera.start();
  }

  drawResults(results: any) {
    const canvasEl = this.canvas.nativeElement;
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
 /*        const drawLabel = (text: string, x: number, y: number) => {
          canvasCtx.font = '12px Arial';
          canvasCtx.fillStyle = 'gray';
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
 */
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
      return '👍 Joinha com a mão direita';
    if (this.detectJoinha(landmarks) && handLabel === 'Left')
      return '👍 Joinha com a mão esquerda';
    if (this.detectJoinhaInvertido(landmarks) && handLabel === 'Right')
      return '👎 Não Curtir com a direita';
    if (this.detectJoinhaInvertido(landmarks) && handLabel === 'Left')
      return '👎 Não Curtir com a esquerda';
    if (this.detectLetraL(landmarks) && handLabel === 'Left')
      return 'Letra L com a esquerda';
    if (this.detectLetraL(landmarks) && handLabel === 'Right')
      return 'Letra L com a direita';
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

  detectLetraL(landmarks: any): boolean {
    const indicadorParaCima =
      landmarks[8].y < landmarks[6].y && landmarks[6].y < landmarks[5].y;

    const polegarAfastado =
      landmarks[4].x > landmarks[2].x + 0.05 && // afastamento lateral
      landmarks[4].y > landmarks[3].y; // mais abaixo do indicador

    const outrosDobrados =
      this.isFingerFolded(12, 10, landmarks) &&
      this.isFingerFolded(16, 14, landmarks) &&
      this.isFingerFolded(20, 18, landmarks);

      console.log(indicadorParaCima, polegarAfastado, outrosDobrados);

    return indicadorParaCima && polegarAfastado && outrosDobrados;
  }

  detectLetraS(landmarks: any): boolean {
    return this.areFingersFolded(landmarks) && landmarks[4].x > landmarks[2].x;
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

  // === UTILS ===

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
