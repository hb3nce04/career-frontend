import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {UserDto} from '../../../../shared/dtos/user.dto';
import {SharedTable, TableColumn} from '../../../../shared/components/shared-table/shared-table';
import {DeleteUserDialog} from './delete/delete';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  imports: [
    SharedTable
  ]
})
export class Users implements OnInit {
  private userService = inject(UserService);
  protected dialog = inject(MatDialog);

  data: UserDto[] = [];
  columns: TableColumn[] = [
    {
      field: 'id',
      header: 'Azonosító',
      sortable: true
    },
    {
      field: 'is_admin',
      header: 'Jogosultság',
      sortable: true,
      valueFn: (value: boolean) => value ? 'Admin' : 'Felhasználó'
    }]

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.data = users;
    });
  }

  handleDelete($event: UserDto) {
    this.dialog.open(DeleteUserDialog, {
      data: {
        user: $event
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ngOnInit();
      }
    })
  }
}
