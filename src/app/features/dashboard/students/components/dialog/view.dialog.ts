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
  template: `
    <h1 mat-dialog-title>{{ this.data.student.name }} pályája</h1>
    <mat-dialog-content>
      <div>Szakma: <span>{{ this.data.student.Profession ? this.data.student.Profession.name : 'Nincs' }}</span></div>
      <div>Ágazat: <span>{{ this.data.student.Sector ? this.data.student.Sector.name : 'Nincs' }}</span></div>
      @if (this.data.student.Field?.description) {
        <mat-form-field>
          <mat-label>Pálya leírása</mat-label>
          <textarea matInput [value]="this.data.student.Field.description" [readonly]="true" rows="3"></textarea>
        </mat-form-field>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()" cdkFocusInitial>Bezárás</button>
    </mat-dialog-actions>
  `,
  styles: `
    mat-dialog-content {
      width: 500px;
      height: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      span {
        color: var(--mat-sys-primary)
      }
      mat-form-field {
        width: 100%;
        height: 100%;
        textarea {
          resize: none;
        }
      }
    }
  `,
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
