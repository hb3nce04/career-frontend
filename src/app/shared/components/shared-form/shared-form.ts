import {Component, ContentChild, inject, input, InputSignal, model, ModelSignal, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatOptgroup, MatOption, MatSelect} from '@angular/material/select';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatCheckbox} from '@angular/material/checkbox';

export interface Option {
  value: any;
  label: any;
}

export interface OptionsGroup {
  label: string;
  options: Option[];
}

export interface FieldConfig {
  name: string;
  label: string | ((value: boolean) => string);
  type: 'text' | 'numeric' | 'password' | 'select' | 'toggle' | 'textarea' | 'checkbox';
  autofocus?: boolean;
  value?: any;
  validators?: any[];
  options?: Option[];
  groups?: OptionsGroup[];
  customValidationMessages?: Record<string, string>;
  hint?: string;
}

export const ValidationMessages: Record<string, string> = {
  required: 'Mező kitöltése kötelező',
  email: 'Formátum nem megfelelő',
  pattern: 'Hibás formátum'
};

// TOOD: form group appearance outlined
@Component({
  selector: 'app-shared-form',
  templateUrl: './shared-form.html',
  styleUrl: './shared-form.scss',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatSlideToggle,
    MatHint,
    MatCheckbox,
    MatOptgroup,
  ]
})
export class SharedForm implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);

  fields: ModelSignal<FieldConfig[]> = model.required();
  validSubmit = output()

  customValidators: InputSignal<ValidatorFn | ValidatorFn[] | null | undefined> = input();

  form!: FormGroup;

  @ContentChild('submitButton') customButton: any;

  ngOnInit(): void {
    const group: any = {};
    this.fields().forEach((field: FieldConfig) => {
      group[field.name] = [field.value || (field.type === 'toggle' ? false : ''), field.validators || []];
    });
    this.form = this.formBuilder.group(group, {
      validators: this.customValidators()
    });
  }

  errorKeys(fieldName: string): string[] {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched || !control.invalid) {
      return [];
    }
    return Object.keys(control.errors);
  }

  messageFor(fieldName: string, errorKey: string): string {
    return (
      ValidationMessages[errorKey] ??
      this.fields().find(f => f.name === fieldName)?.customValidationMessages?.[errorKey] ??
      'Hibás mező'
    );
  }

  handleSubmit() {
    if (this.form.valid) {
      this.validSubmit.emit(this.form.value);
    } else {
      this.form.markAsTouched();
    }
  }
}
