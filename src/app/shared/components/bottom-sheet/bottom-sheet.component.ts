import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BottomSheetService } from '../../services/bottom-sheet.service';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { iNames } from '../../interfaces/names.interface';
import { Observable, Subscription } from 'rxjs';
import { NameStatesService } from '../../states/name-states/name-states.service';

@Component({
  selector: 'component-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent implements OnDestroy {
  showName$: Observable<string> = this.nameState.showName$;
  showFont$: Observable<string> = this.nameState.showFont$;
  name!: string;
  font!: string;
  private subscription!: Subscription;

  loading = true;

  constructor(
    public bootRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: iNames,
    private nameState: NameStatesService
  ) {
    this.subscription = this.nameState.showName$.subscribe((name) => {
     console.log('Nome atualizado:', name);
     this.name = name;
  });

    this.subscription = this.nameState.showFont$.subscribe((font) => {
     console.log('font atualizado:', font);
     this.font = font;
  });
  }

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
