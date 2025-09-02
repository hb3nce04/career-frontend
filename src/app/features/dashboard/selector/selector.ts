import {Component, inject, OnInit} from '@angular/core';
import {ClassService} from './services/class.service';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {ClassModel} from '../../../shared/models/class.model';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NotificationService} from '../../../core/services/notification.service';
import {Router} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {CreateClassDialog} from './components/dialog/create.dialog';
import {MatDialog} from '@angular/material/dialog';
import {DeleteClassDialog} from './components/dialog/delete.dialog';
import {EditClassDialog} from './components/dialog/edit.dialog';
import {SchoolService} from './services/school.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatButton,
    AsyncPipe
  ]
})
export class Selector implements OnInit {
  protected classService = inject(ClassService);
  protected schoolService = inject(SchoolService);
  protected classSelectorService = inject(ClassSelectorService);
  protected notificationService = inject(NotificationService);
  protected router = inject(Router);
  protected dialog = inject(MatDialog);

  classes: ClassModel[] = [];

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getAll().subscribe(classes => {
      this.classes = classes;
    });
  }

  handleClassSelection(schoolClass: ClassModel) {
    this.classSelectorService.select(schoolClass).subscribe({
        next: () => {
          this.notificationService.open("Az osztály sikeresen kiválasztásra került!")
          this.router.navigate(['/dashboard/students']);
        }
      }
    )
  }

  handleClassUnselection() {
    this.classSelectorService.unselect().subscribe({
        next: () => {
          this.notificationService.open("Az osztály kiválasztása sikeresen törlésre került!")
        }
      }
    )
  }

  handleClassDelete(schoolClass: ClassModel) {
    this.dialog.open(DeleteClassDialog, {
      data: {
        class: schoolClass
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadClasses();
      }
    })
  }

  handleClassCreate() {
    this.schoolService.getAll().subscribe({
      next: (data) => {
        this.dialog.open(CreateClassDialog, {
          data: {
            schools: data,
          }
        }).afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.loadClasses();
          }
        })
      }
    })
  }

  handleClassEdit(schoolClass: ClassModel) {
    this.schoolService.getAll().subscribe({
      next: (data) => {
        this.dialog.open(EditClassDialog, {
          data: {
            class: schoolClass,
            schools: data
          }
        }).afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.loadClasses();
          }
        })
      }
    })
  }
}
