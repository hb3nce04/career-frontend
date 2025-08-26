import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {environment} from '../../../../../environments/environment';
import {IUser} from '../../../../shared/models/user.model';
import {UserService} from './user.service';
import {MatPaginator} from '@angular/material/paginator';

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
    MatPaginator
  ]
})
export class Users implements OnInit{
  private userService = inject(UserService);

  data: IUser[] = [];
  columns: string[] = ['id', 'isAdmin'];

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.data = users;
    });
  }
}
