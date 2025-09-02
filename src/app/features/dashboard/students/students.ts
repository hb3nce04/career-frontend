import {Component, computed, inject, OnInit} from '@angular/core';
import {StudentService} from './services/student.service';
import {StudentModel} from '../../../shared/models/student.model';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {SharedTable, TableColumn} from '../../../shared/components/shared-table/shared-table';
import {MatDialog} from '@angular/material/dialog';
import {DeleteStudentDialog} from './components/dialog/delete.dialog';
import {MatButton} from '@angular/material/button';
import {CreateStudentDialog} from './components/dialog/create.dialog';
import {ProfessionService} from './services/profession.service';
import {NotificationService} from '../../../core/services/notification.service';
import {CategoryService} from './services/category.service';
import {forkJoin} from 'rxjs';
import {SectorService} from './services/sector.service';
import {EditStudentDialog} from './components/dialog/edit.dialog';
import {ViewStudentFieldDialog} from './components/dialog/view.dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.html',
  styles: `
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  `,
  imports: [
    SharedTable,
    MatButton
  ]
})
export class Students implements OnInit {
  private classSelectorService: ClassSelectorService = inject(ClassSelectorService);
  private studentSerivce: StudentService = inject(StudentService);
  private professionService: ProfessionService = inject(ProfessionService);
  private categoryService: CategoryService = inject(CategoryService);
  private sectorService: SectorService = inject(SectorService);
  private notificationService: NotificationService = inject(NotificationService);
  private selectedClass = computed(() => this.classSelectorService.selectedClassSubject.value);
  protected dialog = inject(MatDialog);

  data: StudentModel[] = [];
  columns: TableColumn[] = [
    {
      header: 'OM azonosító',
      field: 'id',
      sortable: true,
    },
    {
      header: 'Név',
      field: 'name',
      sortable: true,
    },{
      header: 'Munkarend',
      field: 'day_shift',
      valueFn: (row: StudentModel) => row.day_shift ? 'Nappali' : 'Esti'
    }, {
      header: 'Pálya megtekintése',
      field: 'viewField',
      type: 'button',
      buttonText: 'Megtekintés',
      buttonAction: (row: StudentModel) => this.handleFieldView(row),
      hideFromExport: true
    }]

  ngOnInit(): void {
    this.studentSerivce.getAllByClassId(this.selectedClass()!.id).subscribe(
      students => {
        this.data = students;
      }
    )
  }

  handleDelete($event: StudentModel) {
    this.dialog.open(DeleteStudentDialog, {
      data: {
        student: $event
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ngOnInit();
      }
    })
  }

  handleCreate() {
    forkJoin({
      professions: this.professionService.getAll(),
      categories: this.categoryService.getAll(),
      sectors: this.sectorService.getAll(),
    }).subscribe({
      next: ({professions, categories, sectors}) => {
        this.dialog.open(CreateStudentDialog, {
          data: {professions, categories, sectors}
        }).afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.ngOnInit();
          }
        });
      },
      error: (err) => {
        this.notificationService.open('Hiba történt az adatok betöltése során!');
        console.error(err);
      }
    });
  }

  handleEdit(studentDto: StudentModel) {
    let professionOrSectorId = undefined;
    if (studentDto.Profession) {
      professionOrSectorId = studentDto.Profession.id + "p"
    } else if (studentDto.Sector) {
      professionOrSectorId = studentDto.Sector.id + "s"
    }
    forkJoin({
      professions: this.professionService.getAll(),
      categories: this.categoryService.getAll(),
      sectors: this.sectorService.getAll(),
    }).subscribe({
      next: ({professions, categories, sectors}) => {
        this.dialog.open(EditStudentDialog, {
          data: {professions, categories, sectors, student: {...studentDto, professionOrSectorId}}
        }).afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.ngOnInit();
          }
        });
      },
      error: (err) => {
        this.notificationService.open('Hiba történt az adatok betöltése során!');
        console.error(err);
      }
    });
  }

  private handleFieldView(row: StudentModel) {
    this.dialog.open(ViewStudentFieldDialog, {
      data: {
        student: row
      }
    });
  }
}
