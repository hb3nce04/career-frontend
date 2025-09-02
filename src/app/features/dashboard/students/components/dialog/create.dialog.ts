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
import {NotificationService} from '../../../../../core/services/notification.service';
import {StudentService} from '../../services/student.service';
import {ClassSelectorService} from '../../../../../core/services/class-selector.service';
import {FieldConfig, SharedForm} from '../../../../../shared/components/shared-form/shared-form';
import {ProfessionModel} from '../../../../../shared/models/profession.model';
import {SectorModel} from '../../../../../shared/models/sector.model';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-create-student-dialog',
  template: `
    <h1 mat-dialog-title>Új tanuló létrehozása</h1>
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
export class CreateStudentDialog {
  readonly dialogRef = inject(MatDialogRef<CreateStudentDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected studentService = inject(StudentService);
  protected notificationService = inject(NotificationService);
  protected classSelector = inject(ClassSelectorService);

  fields: WritableSignal<FieldConfig[]> = signal([
    {
      name: 'id',
      label: 'OM azonosító',
      type: 'numeric',
      autofocus: true,
      validators: [Validators.required, Validators.pattern('^[0-9]{11}$')],
    },
    {
      name: 'name',
      label: 'Tanuló neve',
      type: 'text',
    },
    {
      name: 'professionOrSectorId',
      label: 'Szakma / ágazat',
      type: 'select',
      validators: [Validators.required],
      groups: [
        {
          label: 'Szakma',
          options: this.data.professions.map((profession: ProfessionModel) => {
            return {value: profession.id+"p", label: `${profession.name} - ${profession.number}`};
          })
        },
        {
          label: 'Ágazat',
          options: this.data.sectors.map((sector: SectorModel) => {
            return {value: sector.id+"s", label: `${sector.name} - ${sector.number}`};
          })
        }
      ]
    },
    {
      name: 'categoryId',
      label: 'Pálya kategóriája',
      type: 'select',
      validators: [Validators.required],
      options: this.data.categories.map((category: CategoryModel) => {
        return {value: category.id, label: category.name};
      }),
    },
    {
      name: 'description',
      label: 'Pálya leírása',
      type: 'textarea',
      validators: [Validators.required],
      hint: 'A pálya leírása maximum 255 karakter hosszú lehet.'
    },
    {
      name: 'isDayShift',
      label: 'Nappali munkarend',
      type: 'checkbox',
    }
  ]);

  handleSave(values: any) {
    const {id, name, professionOrSectorId, categoryId, description, isDayShift} = values;
    this.studentService.create(this.classSelector.selectedClassSubject.value!.id, parseInt(id!), name!, professionOrSectorId!, parseInt(categoryId!), description!, !!isDayShift).subscribe({
        next: result => {
          this.notificationService.open(result.message)
          this.dialogRef.close(true);
        },
        error: response => {
          const error = response.error;
          this.notificationService.open(error.message ?? 'Hiba történt a tanuló létrehozása során!')
        }
      }
    )
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
