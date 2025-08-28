import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {UserService} from '../../../../core/services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {UserDto} from '../../../../shared/dtos/user.dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  imports: [
    MatHeaderCell,
    MatCell,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatNoDataRow
  ]
})
export class Users implements OnInit{
  private userService = inject(UserService);

  data: UserDto[] = [];
  columns: string[] = ['id', 'isAdmin'];

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.data = users;
    });
  }
}
