import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NotificationService} from '../../../../core/services/notification.service';
import {MatOptgroup, MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {StudentService} from '../student.service';
import {ClassSelectorService} from '../../../../core/services/class-selector.service';

@Component({
  selector: 'app-edit-student-dialog',
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogActions,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    MatError,
    MatOption,
    MatSelect,
    MatHint,
    MatCheckbox,
    MatOptgroup
  ]
})
export class EditStudentDialog {
  readonly dialogRef = inject(MatDialogRef<EditStudentDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected studentService = inject(StudentService);
  protected notificationService = inject(NotificationService);
  protected classSelector = inject(ClassSelectorService);

  form = new FormGroup({
    id: new FormControl(this.data.student.id, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    name: new FormControl(this.data.student.name, [Validators.required, Validators.pattern('^[^\\d\'"`\\\\]{2,100}$')]),
    professionOrSectorId: new FormControl(this.data.student.professionOrSectorId, [Validators.required]),
    categoryId: new FormControl(this.data.student.Field?.category_id),
    description: new FormControl(this.data.student.Field?.description, [ Validators.minLength(5), Validators.maxLength(255)]),
    isDayShift: new FormControl(this.data.student.day_shift, [Validators.required]),
  });

  handleSave() {
   if (this.form.valid) {
     const {id, name, professionOrSectorId, categoryId, description, isDayShift} = this.form.value;
     this.studentService.update(this.classSelector.selectedClassSubject.value!.id, parseInt(id!), name!, professionOrSectorId!, parseInt(categoryId!), description!, !!isDayShift).subscribe({
       next: result => {
         this.notificationService.open(result.message)
         this.dialogRef.close(true);
       },
       error: response => {
         const error = response.error;
         this.notificationService.open(error.message ?? 'Hiba történt a tanuló módosítása során!')
       }}
     )
   }
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
