import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {UserService} from '../../../../../core/services/user.service';
import {NotificationService} from '../../../../../core/services/notification.service';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatSlideToggle
  ]
})
export class EditUserDialog {
  readonly dialogRef = inject(MatDialogRef<EditUserDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected userService = inject(UserService);
  protected notificationService = inject(NotificationService);

  editForm = new FormGroup({
    id: new FormControl(this.data.user.id, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')]),
    isAdmin: new FormControl(this.data.user.is_admin)
  });

  handleSave() {
   if (this.editForm.valid) {
     const {id, password, isAdmin} = this.editForm.value;
     // @ts-ignore
     // TODO: endpoint
   }
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
