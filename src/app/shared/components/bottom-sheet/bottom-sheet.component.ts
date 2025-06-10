import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  ViewChild,
} from '@angular/core';
import { BottomSheetService } from '../../services/bottom-sheet.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { iNames } from '../../interfaces/names.interface';

@Component({
  selector: 'component-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent {
  loading = true;

  constructor(
    public bootRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: iNames,
  ) {}

  onGifLoad() {
    this.loading = false;
  }

  onGifError() {
    this.loading = false;
    console.error('Erro ao carregar o GIF');
  }

  cancel(): void {
    this.bootRef.dismiss();
  }
}
