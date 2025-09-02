import {Component, inject} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {LoadingService} from '../../../core/services/loading.service';
import {NotificationService} from '../../../core/services/notification.service';
import {Router} from '@angular/router';
import {FieldConfig, SharedForm} from '../../../shared/components/shared-form/shared-form';
import {MatButton} from '@angular/material/button';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <img [src]="this.themeService.darkModeSubject.value ? 'lightfingerprint.svg' : 'darkfingerprint.svg'" class="logo" alt="Logo"/>
      <h1>Bejelentkezés</h1>
      <app-shared-form [fields]="this.fields" (validSubmit)="handleLogin($event)">
        <button submit-button matButton="filled" [disabled]="this.loadingService.loadingSubject.value">
          Bejelentkezés
        </button>
      </app-shared-form>
    </div>
  `,
  styles: `
    .login-container {
      display: flex;
      gap: 20px;
      flex-direction: column;
      position: absolute;
      top: 15%;
      left: calc(50% - 400px/2);
      width: 400px;
      .logo {
        width: 60px;
        height: 60px;
        align-self: center;
      }
      h1 {
        text-align: center;
      }
    }
  `,
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
  protected themeService: ThemeService = inject(ThemeService);
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
