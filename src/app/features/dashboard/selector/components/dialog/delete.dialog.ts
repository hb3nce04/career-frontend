import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {ClassService} from '../../services/class.service';
import {NotificationService} from '../../../../../core/services/notification.service';

@Component({
  selector: 'app-delete-class-dialog',
  template: `
    <h1 mat-dialog-title>Biztosan törölni szeretnéd az alábbi osztályt?</h1>
    <mat-dialog-content>
      <div>Név: <span>{{ this.data.class.name ?? 'Nincs' }}</span></div>
      <div>Végzés éve: <span>{{ this.data.class.finishing_year ?? 'Nincs' }}</span></div>
      <div>Iskola neve: <span>{{ this.data.class.School.name ?? 'Nincs' }}</span></div>
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
export class DeleteClassDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected notificationService = inject(NotificationService);

  handleDelete() {
    this.classService.delete(this.data.class.id).subscribe({
      next: result => {
        this.notificationService.open(result.message)
        this.dialogRef.close(true);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt az osztály törlése során!')
      }}
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
