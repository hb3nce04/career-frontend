import {Component, inject, OnInit} from '@angular/core';
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
export class EditStudentDialog implements OnInit{
  readonly dialogRef = inject(MatDialogRef<EditStudentDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected studentService = inject(StudentService);
  protected notificationService = inject(NotificationService);
  protected classSelector = inject(ClassSelectorService);

  createForm = new FormGroup({
    id: new FormControl(this.data.student.id, [Validators.required, Validators.pattern('^[0-9]{11}$')]),
    name: new FormControl(this.data.student.name, [Validators.required, Validators.pattern('^[^\\d\'"`\\\\]{2,100}$')]),
    professionOrSectorId: new FormControl(this.data.student.professionOrSectorId, [Validators.required]),
    fieldCategoryId: new FormControl(this.data.student.Field?.category_id),
    fieldDescription: new FormControl(this.data.student.Field?.description, [ Validators.minLength(5), Validators.maxLength(255)]),
    isDayShift: new FormControl(this.data.student.day_shift, [Validators.required]),
  });

  // TODO: createForm mindenhol rename -> form + NEM JÓ SOÓS GABINÁL
  ngOnInit(): void {
    this.createForm.get('professionOrSectorId')?.valueChanges.subscribe((value: string) => {
      if (value.includes('s')) {
        this.createForm.get('fieldCategoryId')?.setValidators([Validators.required]);
        this.createForm.get('fieldDescription')?.setValidators([Validators.required]);
      } else if (value.includes('p')) {
        this.createForm.get('fieldCategoryId')?.clearValidators();
        this.createForm.get('fieldDescription')?.clearValidators();
      }

      this.createForm.get('fieldCategoryId')?.updateValueAndValidity();
      this.createForm.get('fieldDescription')?.updateValueAndValidity();
    });
  }

  handleSave() {
   if (this.createForm.valid) {
     const {id, name, professionOrSectorId, fieldCategoryId, fieldDescription, isDayShift} = this.createForm.value;
     this.studentService.update(this.classSelector.selectedClassSubject.value!.id, parseInt(id!), name!, professionOrSectorId!, parseInt(fieldCategoryId!), fieldDescription!, !!isDayShift).subscribe({
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
