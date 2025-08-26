import {FormGroup, ValidationErrors} from '@angular/forms';

export function passwordMatchValidator(form: FormGroup): ValidationErrors | null {
  const password = form.get('oldPassword')?.value;
  const confirm = form.get('newPassword')?.value;

  if (password !== confirm) {
    return { passwordMismatch: true };
  }
  return null;
}
