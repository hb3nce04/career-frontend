import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ this.data.title }}</h1>
    <mat-dialog-actions>
      <button matButton (click)="onClose(false)">Nem</button>
      <button matButton (click)="onClose(true)" cdkFocusInitial>Igen</button>
    </mat-dialog-actions>
  `,
  imports: [
    ReactiveFormsModule,
    MatDialogActions,
    MatButton,
    MatDialogTitle,

  ]
})
export class ConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject<{ title: string }>(MAT_DIALOG_DATA);

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }
}
