import {Component, computed, inject, OnInit} from '@angular/core';
import {StudentService} from './student.service';
import {StudentDto} from '../../../shared/dtos/student.dto';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {SharedTable, TableColumn} from '../../../shared/components/shared-table/shared-table';
import {MatDialog} from '@angular/material/dialog';
import {DeleteStudentDialog} from './delete/delete';
import {MatButton} from '@angular/material/button';
import {CreateStudentDialog} from './create/create';
import {ProfessionService} from './profession.service';
import {NotificationService} from '../../../core/services/notification.service';
import {CategoryService} from './category.service';
import {forkJoin} from 'rxjs';
import {SectorService} from './sector.service';
import {EditStudentDialog} from './edit/edit';
import {ViewStudentFieldDialog} from './view/view';

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

  data: StudentDto[] = [];
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
      valueFn: (row: StudentDto) => row.day_shift ? 'Nappali' : 'Esti'
    }, {
      header: 'Pálya megtekintése',
      field: 'viewField',
      type: 'button',
      buttonText: 'Megtekintés',
      buttonAction: (row: StudentDto) => this.handleFieldView(row),
      hideFromExport: true
    }]

  ngOnInit(): void {
    this.studentSerivce.getAllByClassId(this.selectedClass()!.id).subscribe(
      students => {
        this.data = students;
      }
    )
  }

  handleDelete($event: StudentDto) {
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

  handleEdit(studentDto: StudentDto) {
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

  private handleFieldView(row: StudentDto) {
    this.dialog.open(ViewStudentFieldDialog, {
      data: {
        student: row
      }
    });
  }
}
