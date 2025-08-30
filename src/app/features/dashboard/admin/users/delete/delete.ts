import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../../../core/services/user.service';
import {NotificationService} from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete.html',
  styleUrl: './delete.scss',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogTitle
  ]
})
export class DeleteUserDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteUserDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected userService = inject(UserService);
  protected notificationService = inject(NotificationService);

  handleDelete() {
    this.userService.delete(this.data.user.id).subscribe({
      next: result => {
        this.notificationService.open(result.message)
        this.dialogRef.close(true);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt a felhasználó törlése során!')
      }}
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
