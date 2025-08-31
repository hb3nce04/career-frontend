import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-view-student-field-dialog',
  templateUrl: './view.html',
  styleUrl: './view.scss',
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ]
})
export class ViewStudentFieldDialog {
  readonly dialogRef = inject(MatDialogRef<ViewStudentFieldDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  handleClose() {
    this.dialogRef.close(false);
  }
}
