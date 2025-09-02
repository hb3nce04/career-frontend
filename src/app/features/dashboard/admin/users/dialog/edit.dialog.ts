import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../../../core/services/user.service';
import {NotificationService} from '../../../../../core/services/notification.service';
import {FieldConfig, SharedForm} from '../../../../../shared/components/shared-form/shared-form';

@Component({
  selector: 'app-edit-user-dialog',
  template: `
    <h1 mat-dialog-title>Felhasználó módosítása</h1>
    <mat-dialog-content>
      <app-shared-form [(fields)]="fields" (validSubmit)="handleSave()" #form/>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()" cdkFocusInitial>Mégsem</button>
      <button matButton (click)="form.handleSubmit()">Mentés</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    SharedForm
  ]
})
export class EditUserDialog {
  readonly dialogRef = inject(MatDialogRef<EditUserDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected userService = inject(UserService);
  protected notificationService = inject(NotificationService);

  fields: FieldConfig[] = [
    {
      name: 'id',
      label: 'OM azonosító',
      type: 'numeric',
      value: this.data.user.id,
      autofocus: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{11}$')],
    },
    {
      name: 'password',
      label: 'Jelszó',
      type: 'password',
      validators: [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')],
    },
    {
      name: 'isAdmin',
      label: (val) => val ? "Admin" : "Felhasználó",
      type: 'toggle',
      value: this.data.user.is_admin,
    }
  ];

  // TODO: implement with parameter: values: any ($event)
  handleSave() {

  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
