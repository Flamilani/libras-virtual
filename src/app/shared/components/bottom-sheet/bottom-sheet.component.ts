import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
} from '@angular/core';
import { BottomSheetService } from '../../services/bottom-sheet.service';

@Component({
  selector: 'component-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent implements AfterViewInit {
  @ViewChild('bottomSheet') bottomSheet!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  constructor(
    private el: ElementRef,
    private readonly bottomSheetService: BottomSheetService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.bottomSheetService.bottomSheetState$.subscribe((isOpen: boolean) => {
      this.ngZone.run(() => {
        this.toggleBottomSheet(isOpen);
      });
    });
  }

  toggleBottomSheet(isOpen: boolean) {
    if (isOpen) {
      this.bottomSheet.nativeElement.classList.add('active');
      this.overlay.nativeElement.classList.add('active');
    } else {
      this.bottomSheet.nativeElement.classList.remove('active');
      this.overlay.nativeElement.classList.remove('active');
    }
  }

  closeBottomSheet() {
    this.bottomSheetService.close();
  }
}
