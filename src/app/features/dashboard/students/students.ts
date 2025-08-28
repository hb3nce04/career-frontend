import {Component, computed, inject, OnInit} from '@angular/core';
import {StudentService} from './service/student.service';
import {StudentDto} from '../../../shared/dtos/student.dto';
import {ClassSelectorService} from '../../../core/services/class-selector.service';
import {SharedTable, TableColumn} from '../../../shared/components/shared-table/shared-table';

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

  data: StudentDto[] = [];
  columns: TableColumn[] = [
    {
      header: 'Azonosító',
      field: 'id'
    },
    {
      header: 'Név',
      field: 'name'
    }
    ];

  ngOnInit(): void {
    this.studentSerivce.getAllByClassId(this.selectedClass()!.id).subscribe(
      students => {
        this.data = students;
      }
    )
  }
}
