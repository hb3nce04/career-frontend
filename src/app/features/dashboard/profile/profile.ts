import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {FormsModule, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {LoadingService} from '../../../core/services/loading.service';
import {UserService} from '../../../core/services/user.service';
import {NotificationService} from '../../../core/services/notification.service';
import {FieldConfig, SharedForm} from '../../../shared/components/shared-form/shared-form';
import {CustomValidators} from '../../../shared/validators/custom.validator';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    SharedForm
  ]
})
export class Profile {
  protected authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected userService: UserService = inject(UserService);
  protected themeService: ThemeService = inject(ThemeService);
  private notificationService: NotificationService = inject(NotificationService);

  customValidators: ValidatorFn[] = [
    CustomValidators.match('newPassword', 'newPasswordAgain'),
    CustomValidators.notMatch('oldPassword', 'newPassword'),
  ];

  fields: FieldConfig[] = [
    {
      name: 'oldPassword',
      label: 'Régi jelszó',
      type: 'password',
      autofocus: true,
      validators: [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')]
    },
    {
      name: 'newPassword',
      label: 'Új jelszó',
      type: 'password',
      validators: [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')],
      customValidationMessages : {
        notMatch: 'A jelszavaknak különbözőnek kell lenniük'
      }
    },
    {
      name: 'newPasswordAgain',
      label: 'Új jelszó mégegyszer',
      type: 'password',
      validators: [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')],
      customValidationMessages: {
        match: 'A két jelszó nem egyezik'
      }
    },
  ]

  handleUpdateProfile(value: any) {
    const {oldPassword, newPassword} = value;
    this.userService.updatePassword(oldPassword!, newPassword!).subscribe({
        next: result => {
          this.notificationService.open(result.message)
        },
        error: response => {
          const error = response.error;
          this.notificationService.open(error.message ?? 'Hiba történt a jelszó frissítése során!')
        }
      }
    )
  }
}
