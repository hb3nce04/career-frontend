import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {SchoolDto} from '../../../../shared/dtos/school.dto';
import {SchoolService} from '../school.service';
import {ClassService} from '../class.service';
import {NotificationService} from '../../../../core/services/notification.service';
import {MatFormField} from '@angular/material/form-field';
import {MatSelect, MatOption} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatError, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-edit-class-dialog',
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatInput,
    MatLabel,
    MatError
  ]
})
export class EditClassDialog implements OnInit{
  readonly dialogRef = inject(MatDialogRef<EditClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected schoolService = inject(SchoolService);
  protected notificationService = inject(NotificationService);

  finishingYears: number[] = [];
  schools: SchoolDto[] = [];

  form = new FormGroup({
    name: new FormControl(this.data.class.name, [Validators.required]),
    finishingYear: new FormControl(this.data.class.finishing_year, [Validators.required]),
    schoolId: new FormControl(this.data.class.School.id, [Validators.required]),
  });

  ngOnInit(): void {
    const interval = 25;
    const currentYear = new Date().getFullYear() - interval;
    this.finishingYears = Array.from({ length: interval+1 }, (_, i) => currentYear + i);
    this.schoolService.getAll().subscribe(schools => {
      this.schools = schools;
    });
  }

  handleSave() {
   if (this.form.valid) {
     const {name, finishingYear, schoolId} = this.form.value;
     this.classService.update(this.data.class.id, name!, parseInt(finishingYear!), parseInt(schoolId!)).subscribe({
       next: result => {
         this.notificationService.open(result.message)
         this.dialogRef.close(true);
       },
       error: response => {
         const error = response.error;
         this.notificationService.open(error.message ?? 'Hiba történt az osztály módosítása során!')
       }}
     )
   }
  }

  handleClose() {
    this.dialogRef.close(false);
  }
}
