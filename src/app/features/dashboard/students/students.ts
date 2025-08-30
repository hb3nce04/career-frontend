import {Component, computed, inject, OnInit} from '@angular/core';
import {StudentService} from './student.service';
import {StudentDto} from '../../../shared/dtos/student.dto';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {SharedTable, TableColumn} from '../../../shared/components/shared-table/shared-table';
import {MatDialog} from '@angular/material/dialog';
import {DeleteStudentDialog} from './delete/delete';

@Component({
  selector: 'app-students',
  templateUrl: './students.html',
  imports: [
    SharedTable
  ]
})
export class Students implements OnInit {
  private classSelectorService: ClassSelectorService = inject(ClassSelectorService);
  private studentSerivce: StudentService = inject(StudentService);
  private selectedClass = computed(() => this.classSelectorService.selectedClassSubject.value);
  protected dialog = inject(MatDialog);

  data: StudentDto[] = [];
  columns: TableColumn[] = [
    {
      header: 'Azonosító',
      field: 'id',
      sortable: true,
    },
    {
      header: 'Név',
      field: 'name',
      sortable: true,
    },
    {
      header: 'Ágazat',
      field: 'Sector',
      valueFn: value => value["name"]
    },{
      header: 'Szakma',
      field: 'Profession',
      valueFn: value => value["name"]
    },{
      header: 'Munkarend',
      field: 'day_shift',
      valueFn: (row: StudentDto) => row.day_shift ? 'Nappali' : 'Esti'
    },{
      header: 'Pálya neve',
      field: 'sectorName',
      valueFn: (row: StudentDto) => row.Sector.name
    },{
      header: 'Pálya leírása',
      field: 'fieldDescription',
      valueFn: (row: StudentDto) => row.Field?.description
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
}
