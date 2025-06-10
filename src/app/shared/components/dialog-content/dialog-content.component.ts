import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { iNames } from '../../interfaces/names.interface';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent {
  loading = true;

  constructor(
    public dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: iNames,

  ) {
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
}
