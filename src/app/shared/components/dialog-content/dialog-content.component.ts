import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { iNames } from '../../interfaces/names.interface';
import { NameStatesService } from '../../states/name-states/name-states.service';
import { Observable, Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.css'],
    standalone: true,
    imports: [MatDialogContent, MatDialogTitle, NgClass]
})
export class DialogContentComponent implements OnDestroy {
  loading = true;
  showName$: Observable<string> = this.nameState.showName$;
  showFont$: Observable<string> = this.nameState.showFont$;
  name!: string;
  font!: string;
  private subscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: iNames,
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

  cancel(): void {
    this.dialogRef.close();
  }

  onGifLoad() {
    this.loading = false;
  }

  onGifError() {
    this.loading = false;
    console.error('Erro ao carregar o GIF');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
