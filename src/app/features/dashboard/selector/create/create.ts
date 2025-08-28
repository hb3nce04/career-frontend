import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {SchoolDto} from '../../../../shared/dtos/school.dto';
import {SchoolService} from '../school.service';
import {MatOption, MatSelect} from '@angular/material/select';
import {ClassService} from '../class.service';
import {NotificationService} from '../../../../core/services/notification.service';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create.html',
  styleUrl: './create.scss',
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
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError
  ]
})
export class CreateClassDialog implements OnInit{
  readonly dialogRef = inject(MatDialogRef<CreateClassDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected classService = inject(ClassService);
  protected schoolService = inject(SchoolService);
  protected notificationService = inject(NotificationService);

  finishingYears: number[] = [];
  schools: SchoolDto[] = [];

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    finishingYear: new FormControl('', [Validators.required]),
    schoolId: new FormControl('', [Validators.required]),
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
   if (this.createForm.valid) {
     const {name, finishingYear, schoolId} = this.createForm.value;
     this.classService.create(name!, parseInt(finishingYear!), parseInt(schoolId!)).subscribe({
       next: result => {
         this.notificationService.open(result.message)
         this.dialogRef.close();
       },
       error: response => {
         const error = response.error;
         this.notificationService.open(error.message ?? 'Hiba történt az osztály létrehozása során!')
       }}
     )
   }
  }

  handleClose() {
    this.dialogRef.close();
  }
}
