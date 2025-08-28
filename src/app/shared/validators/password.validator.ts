import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const passwordValue = passwordControl.value;
    const confirmPasswordValue = confirmPasswordControl.value;

    if (confirmPasswordValue === '') {
      return null;
    }

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPasswordControl.hasError('passwordMismatch')) {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }
  };
}

export function passwordNotMatchValidator(oldPassword: string, newPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const oldPasswordControl = formGroup.get(oldPassword);
    const newPasswordControl = formGroup.get(newPassword);

    if (!oldPasswordControl || !newPasswordControl) {
      return null;
    }

    const passwordValue = oldPasswordControl.value;
    const confirmPasswordValue = newPasswordControl.value;

    if (confirmPasswordValue === '') {
      return null;
    }

    if (passwordValue == confirmPasswordValue) {
      newPasswordControl.setErrors({ passwordMatch: true });
      return { passwordMatch: true };
    } else {
      if (newPasswordControl.hasError('passwordMatch')) {
        newPasswordControl.setErrors(null);
      }
      return null;
    }
  };
}

