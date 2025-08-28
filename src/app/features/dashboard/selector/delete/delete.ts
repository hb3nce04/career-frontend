import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ClassService} from '../class.service';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
  selector: 'app-delete-class-dialog',
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ]
})
export class DeleteClassDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected notificationService = inject(NotificationService);

  handleClose() {
    this.dialogRef.close();
  }

  handleDelete() {
    this.classService.delete(this.data.class.id).subscribe({
      next: result => {
        this.notificationService.open(result.message)
        this.dialogRef.close();
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt az osztály törlése során!')
      }}
    )
  }
}
