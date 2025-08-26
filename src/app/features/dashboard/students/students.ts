import {Component, inject, OnInit} from '@angular/core';
import {StudentService} from './student.service';
import {IStudent} from './student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.html',
  imports: []
})
export class Students implements OnInit{
  private studentService = inject(StudentService);

  data: IStudent[] = [];
  columns: string[] = ['id', 'isAdmin'];

  ngOnInit(): void {
    this.studentService.getAll().subscribe(users => {
      this.data = users;
    });
  }
}
