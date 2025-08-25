import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Footer} from '../../shared/components/footer/footer';
import {AuthService} from '../../core/services/auth.service';

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
    Footer
  ]
})
export class Login {
  private authService: AuthService = inject(AuthService);

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,24}$')])
  });

  handleLogin() {
    if (this.loginForm.valid) {
      const {id, password} = this.loginForm.value;
      this.authService.login(id, password);
    }
  }
}
