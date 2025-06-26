import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeechOcrComponent } from '../../../shared/components/speech-ocr/speech-ocr.component';
import { SpeechKeywordsComponent } from '../../../shared/components/speech-keywords/speech-keywords.component';
import { SpeechTranscriberComponent } from '../../../shared/components/speech-transcriber/speech-transcriber.component';
import { SpeechReaderComponent } from '../../../shared/components/speech-reader/speech-reader.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';

@Component({
    selector: 'app-speech',
    templateUrl: './speech.component.html',
    styleUrls: ['./speech.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        BootstrapIconsModule,
        SpeechReaderComponent,
        SpeechTranscriberComponent,
        SpeechKeywordsComponent,
        SpeechOcrComponent,
    ],
})
export class SpeechComponent implements OnInit {
  isMobile!: boolean;

  constructor() {
     this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  ngOnInit(): void {}

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
