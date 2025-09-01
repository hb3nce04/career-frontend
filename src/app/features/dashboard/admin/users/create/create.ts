import {Component, inject} from '@angular/core';
import {
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
import {FieldConfig, SharedForm} from "../../../../../shared/components/shared-form/shared-form";

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create.html',
  styleUrl: './create.scss',
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
export class CreateUserDialog {
  readonly dialogRef = inject(MatDialogRef<CreateUserDialog>);
  protected userService = inject(UserService);
  protected notificationService = inject(NotificationService);

  fields: FieldConfig[] = [
    {
      name: 'id',
      label: 'OM azonosító',
      type: 'numeric',
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
    }
  ];

  handleSave(values: any) {
    const {id, password, isAdmin} = values;
    // @ts-ignore
    this.userService.create(password!, {id, isAdmin}).subscribe({
        next: result => {
          this.notificationService.open(result.message)
          this.dialogRef.close(true);
        },
        error: response => {
          const error = response.error;
          this.notificationService.open(error.message ?? 'Hiba történt a felhasználó létrehozása során!')
        }
      }
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
