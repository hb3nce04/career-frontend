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
  template: `
    <h1 mat-dialog-title>Biztosan törölni szeretnéd az alábbi felhasználót?</h1>
    <mat-dialog-content>
      <div>OM azonosító: <span>{{ this.data.user.id ?? 'Nincs' }}</span></div>
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
