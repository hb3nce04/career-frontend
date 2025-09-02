import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NotificationService} from '../../../../../core/services/notification.service';
import {StudentService} from '../../services/student.service';

@Component({
  selector: 'app-delete-student-dialog',
  template: `
    <h1 mat-dialog-title>Biztosan törölni szeretnéd az alábbi tanulót?</h1>
    <mat-dialog-content>
      <div>OM azonosító: <span>{{ this.data.student.id ?? 'Nincs' }}</span></div>
      <div>Név: <span>{{ this.data.student.name ?? 'Nincs' }}</span></div>
      <div>Ágazat: <span>{{ this.data.student.Sector?.name ?? 'Nincs' }}</span></div>
      <div>Szakma: <span>{{ this.data.student.Profession?.name ?? 'Nincs' }}</span></div>
      <div>Munkarend: <span>{{ this.data.student.day_shift ? 'Nappali' : 'Esti' }}</span></div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()">Nem</button>
      <button matButton (click)="handleDelete()" cdkFocusInitial>Igen</button>
    </mat-dialog-actions>
  `,
  styles: `
    mat-dialog-content {
      span {
        color: var(--mat-sys-primary)
      }
    }
  `,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ]
})
export class DeleteStudentDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteStudentDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected studentService = inject(StudentService);
  protected notificationService = inject(NotificationService);

  handleDelete() {
    this.studentService.delete(this.data.student.id).subscribe({
      next: result => {
        this.notificationService.open(result.message)
        this.dialogRef.close(true);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt a tanuló törlése során!')
      }}
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
