import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClassService} from '../../services/class.service';
import {NotificationService} from '../../../../../core/services/notification.service';
import {MatButton} from '@angular/material/button';
import {FieldConfig, Option, SharedForm} from "../../../../../shared/components/shared-form/shared-form";
import {SchoolModel} from '../../../../../shared/models/school.model';

@Component({
  selector: 'app-edit-class-dialog',
  template: `
    <h1 mat-dialog-title>Osztály módosítása</h1>
    <mat-dialog-content>
      <app-shared-form [(fields)]="fields" (validSubmit)="this.handleSave($event)" #form/>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()" cdkFocusInitial>Mégsem</button>
      <button matButton (click)="form.handleSubmit()">Mentés</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    SharedForm
  ]
})
export class EditClassDialog {
  readonly dialogRef = inject(MatDialogRef<EditClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected notificationService = inject(NotificationService);

  fields: WritableSignal<FieldConfig[]> = signal([
    {
      name: 'name',
      label: 'Osztály neve',
      type: 'text',
      value: this.data.class.name,
      autofocus: true,
      validators: [Validators.required, Validators.pattern("^[^'\"`\\\\;=()]{2,50}$")]
    },
    {
      name: 'finishingYear',
      label: 'Végzési év',
      type: 'select',
      value: this.data.class.finishing_year,
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
      value: this.data.class.School.id,
      validators: [Validators.required],
      options: this.data.schools.map((school: SchoolModel) => {
        return {value: school.id, label: school.name};
      })
    },
  ]);

  handleSave(form: FormGroup) {
    if (form.dirty) {
      const {name, finishingYear, schoolId} = form.value;
      this.classService.update(this.data.class.id, name!, parseInt(finishingYear!), parseInt(schoolId!)).subscribe({
          next: result => {
            this.notificationService.open(result.message)
            this.dialogRef.close(true);
          },
          error: response => {
            const error = response.error;
            this.notificationService.open(error.message ?? 'Hiba történt az osztály módosítása során!')
          }
        }
      )
    }
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
