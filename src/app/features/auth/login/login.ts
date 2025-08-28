import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../core/services/auth.service';
import {LoadingService} from '../../../core/services/loading.service';
import {NotificationService} from '../../../core/services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
  ]
})
export class Login {
  private authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);
  protected notificationService: NotificationService = inject(NotificationService);
  protected router: Router = inject(Router);

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')])
  });

  handleLogin() {
    if (this.loginForm.valid) {
      const {id, password} = this.loginForm.value;
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
}
