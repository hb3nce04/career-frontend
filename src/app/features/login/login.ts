import {Component} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Footer} from '../../shared/components/footer/footer';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
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
  loginForm = new FormGroup({
    identificationNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  handleLogin() {
    console.log(this.loginForm.value);
  }
}
