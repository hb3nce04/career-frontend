import {Component, inject} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {LoadingService} from '../../../core/services/loading.service';
import {NotificationService} from '../../../core/services/notification.service';
import {Router} from '@angular/router';
import {FieldConfig, SharedForm} from '../../../shared/components/shared-form/shared-form';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [
    ReactiveFormsModule,
    SharedForm,
    MatButton,
  ]
})
export class Login {
  private authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected notificationService: NotificationService = inject(NotificationService);
  protected router: Router = inject(Router);

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
    }
  ]

  handleLogin(values: any) {
    const {id, password} = values;
    this.authService.login(id, password).subscribe({
      next: response => {
        this.notificationService.open(response.message)
        this.router.navigate(['/dashboard/selector']);
      },
      error: response => {
        const error = response.error;
        this.notificationService.open(error.message ?? 'Hiba történt a bejelentkezés során!')
      }
    });
  }
}
