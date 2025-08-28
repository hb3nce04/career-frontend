import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ClassService} from './class.service';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {ClassDto} from '../../../shared/dtos/class.dto';
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
import {CreateClassDialog} from './create/create';
import {MatDialog} from '@angular/material/dialog';
import {DeleteClassDialog} from './delete/delete';

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
  protected classSelectorService = inject(ClassSelectorService);
  protected notificationService = inject(NotificationService);
  protected router = inject(Router);
  protected dialog = inject(MatDialog);
  protected newClass: WritableSignal<{
    name: string;
    finishingYear: number;
    schoolId: number
  } | null> = signal(null);

  classes: ClassDto[] = [];

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getAll().subscribe(classes => {
      this.classes = classes;
    });
  }

  handleClassSelection(schoolClass: ClassDto) {
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

  handleClassCreate() {
    this.dialog.open(CreateClassDialog, {
      data: {
        class: this.newClass()
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadClasses();
      }
    })
  }

  handleClassDelete(schoolClass: ClassDto) {
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
}
