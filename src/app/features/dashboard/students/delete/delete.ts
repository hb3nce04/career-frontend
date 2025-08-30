import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {NotificationService} from '../../../../core/services/notification.service';
import {StudentService} from '../student.service';

@Component({
  selector: 'app-delete-student-dialog',
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
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
