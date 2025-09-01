import {Component, inject, signal, WritableSignal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ClassService} from '../class.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {FieldConfig, Option, SharedForm} from '../../../../shared/components/shared-form/shared-form';
import {SchoolDto} from '../../../../shared/dtos/school.dto';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create.html',
  styleUrl: './create.scss',
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    SharedForm
  ]
})
export class CreateClassDialog {
  readonly dialogRef = inject(MatDialogRef<CreateClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected notificationService = inject(NotificationService);

  fields: WritableSignal<FieldConfig[]> = signal([
    {
      name: 'name',
      label: 'Osztály neve',
      type: 'text',
      autofocus: true,
      validators: [Validators.required, Validators.pattern("^[^'\"`\\\\;=()]{2,50}$")]
    },
    {
      name: 'finishingYear',
      label: 'Végzési év',
      type: 'select',
      validators: [Validators.required],
      options: Array.from({length: 25 + 1}, (_, i) => {
        const computed = new Date().getFullYear() - 25 + i;
        return {value: computed, label: computed} as Option;
      })
    },
    {
      name: 'schoolId',
      label: 'Iskola',
      type: 'select',
      validators: [Validators.required],
      options: this.data.schools.map((school: SchoolDto) => {
        return {value: school.id, label: school.name};
      })
    },
  ]);

  handleSave(values: any) {
    const {name, finishingYear, schoolId} = values;
    this.classService.create(name!, parseInt(finishingYear!), parseInt(schoolId!)).subscribe({
        next: result => {
          this.notificationService.open(result.message)
          this.dialogRef.close(true);
        },
        error: response => {
          const error = response.error;
          this.notificationService.open(error.message ?? 'Hiba történt az osztály létrehozása során!')
        }
      }
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
