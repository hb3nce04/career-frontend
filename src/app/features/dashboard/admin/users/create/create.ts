import {Component, inject} from '@angular/core';
import {
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
  selector: 'app-create-user-dialog',
  templateUrl: './create.html',
  styleUrl: './create.scss',
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
export class CreateUserDialog {
  readonly dialogRef = inject(MatDialogRef<CreateUserDialog>);
  protected userService = inject(UserService);
  protected notificationService = inject(NotificationService);

  form = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')]),
    isAdmin: new FormControl(false)
  });

  handleSave() {
   if (this.form.valid) {
     const {id, password, isAdmin} = this.form.value;
     // @ts-ignore
     this.userService.create(password!, {id, isAdmin}).subscribe({
       next: result => {
         this.notificationService.open(result.message)
         this.dialogRef.close(true);
       },
       error: response => {
         const error = response.error;
         this.notificationService.open(error.message ?? 'Hiba történt a felhasználó létrehozása során!')
       }}
     )
   }
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
