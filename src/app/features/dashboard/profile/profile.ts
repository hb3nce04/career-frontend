import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {LoadingService} from '../../../core/services/loading.service';
import {passwordMatchValidator} from '../../../shared/validators/password-match.validator';
import {UserService} from '../../../core/services/user.service';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ]
})
export class Profile {
  protected authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected userService: UserService = inject(UserService);
  private notificationService: NotificationService = inject(NotificationService);

  profileForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')]),
    newPasswordAgain: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$'), passwordMatchValidator]),
  });

  // TODO: fix validation
  handleUpdateProfile() {
    if (this.profileForm.valid) {
      const {oldPassword, newPassword} = this.profileForm.value;
      this.userService.updatePassword(oldPassword!, newPassword!).subscribe({
        next: result => {
          this.notificationService.open(result.message)
        },
        error: err => {
          this.notificationService.open("Hiba történt a jelszó módosítása során!")
        }}
      )
    }
  }
}
