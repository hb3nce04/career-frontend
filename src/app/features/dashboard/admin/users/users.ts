import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {UserDto} from '../../../../shared/dtos/user.dto';
import {SharedTable, TableColumn} from '../../../../shared/components/shared-table/shared-table';

@Component({
  selector: 'app-users',
  templateUrl: './users.html',
  imports: [
    SharedTable
  ]
})
export class Users implements OnInit{
  private userService = inject(UserService);

  data: UserDto[] = [];
  columns: TableColumn[] = [
    {
      field: 'id',
      header: 'Azonosító'
    },
    {
      field: 'is_admin',
      header: 'Jogosultság',
      valueFn: (value: boolean) => value ? 'Admin' : 'Felhasználó'
    }
  ]

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.data = users;
    });
  }
}
