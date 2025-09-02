import {Component, inject, signal, WritableSignal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {ClassService} from '../../services/class.service';
import {NotificationService} from '../../../../../core/services/notification.service';
import {FieldConfig, Option, SharedForm} from '../../../../../shared/components/shared-form/shared-form';
import {SchoolModel} from '../../../../../shared/models/school.model';

@Component({
  selector: 'app-create-class-dialog',
  template: `
    <h1 mat-dialog-title>Osztály létrehozása</h1>
    <mat-dialog-content>
      <app-shared-form [(fields)]="fields" (validSubmit)="this.handleSave($event)" #form/>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()" cdkFocusInitial>Mégsem</button>
      <button matButton (click)="form.handleSubmit()">Létrehozás</button>
    </mat-dialog-actions>
  `,
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
      options: this.data.schools.map((school: SchoolModel) => {
        return {value: school.id, label: school.name};
      })
    },
  ]);

  handleSave(form: FormGroup) {
    const {name, finishingYear, schoolId} = form.value;
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
