import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { processString } from 'src/app/shared/utils/convert-urls';

@Component({
  selector: 'app-facial-expression',
  templateUrl: './facial-expression.component.html',
  styleUrls: ['./facial-expression.component.css'],
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent],
})
export class FacialExpressionComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private mediaStream: MediaStream | null = null;

  title = StringsNamesUrl.expressoesFaciais;
  link = `/${processString(StringsNamesUrl.visorComputacional)}`;

  currentExpression: string = '';

  expressionEmojis: Record<string, string> = {
    happy: '😄',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
    neutral: '😐',
    disgusted: '🤢',
    fearful: '😨',
  };

  expressionLabelsPt: Record<string, string> = {
    happy: 'Feliz',
    sad: 'Triste',
    angry: 'Bravo',
    surprised: 'Surpreso',
    neutral: 'Neutro',
    disgusted: 'Com nojo',
    fearful: 'Com medo',
  };

  get currentEmoji(): string {
    return this.expressionEmojis[this.currentExpression] || '';
  }

  get currentLabelPt(): string {
    return this.expressionLabelsPt[this.currentExpression] || '';
  }

  async ngOnInit() {
    await this.loadModels();

    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    this.startVideo(video);

    video.onloadedmetadata = () => {
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      faceapi.matchDimensions(canvas, displaySize);

      const update = async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        const resized = faceapi.resizeResults(detections, displaySize);
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);

        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          this.currentExpression = sorted[0][0];
        } else {
          this.currentExpression = '';
        }

        requestAnimationFrame(update);
      };

      update();
    };
  }

  ngOnDestroy() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
  }

  async loadModels() {
    const MODEL_URL = '/assets/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  }

  startVideo(video: HTMLVideoElement) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        this.mediaStream = stream;
      })
      .catch((err) => console.error('Error accessing webcam: ', err));
  }
}
