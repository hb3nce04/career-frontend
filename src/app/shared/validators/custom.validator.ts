import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static match(controlName: string, matchingControlName: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (control && matchingControl && control.value !== matchingControl.value) {
        matchingControl.setErrors({ match: true });
        return { match: true };
      } else {
        return null;
      }
    };
  }

  static notMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (control && matchingControl && control.value === matchingControl.value) {
        matchingControl.setErrors({ notMatch: true });
        return { notMatch: true };
      } else {
        return null;
      }
    };
  }
}
