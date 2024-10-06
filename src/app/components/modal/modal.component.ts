import { Component, Inject } from '@angular/core';
import { DialogRef } from 'src/app/shared/cdk/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/cdk/dialog/dialog-tokens';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: string
  ) {}

  close() {
    this.dialogRef.close();
  }
}
