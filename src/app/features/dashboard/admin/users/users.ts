import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {SharedTable, TableColumn} from '../../../../shared/components/shared-table/shared-table';
import {DeleteUserDialog} from './dialog/delete.dialog';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {CreateUserDialog} from './dialog/create.dialog';
import {EditUserDialog} from './dialog/edit.dialog';
import {UserModel} from '../../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  template: `
    <div class="title">
      <h1>Felhasználók</h1>
      <button matButton="filled" (click)="handleCreate()">Új felhasználó hozzáadása</button>
    </div>
    <app-shared-table [data]="data" [columns]="columns" (delete)="handleDelete($event)" (edit)="handleEdit($event)"/>
  `,
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
export class Users implements OnInit {
  private userService = inject(UserService);
  protected dialog = inject(MatDialog);

  data: UserModel[] = [];
  columns: TableColumn[] = [
    {
      field: 'id',
      header: 'OM azonosító',
      sortable: true
    },
    {
      field: 'is_admin',
      header: 'Jogosultság',
      sortable: true,
      valueFn: (row: any) => row['is_admin'] ? 'Admin' : 'Felhasználó'
    }]

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.data = users;
    });
  }

  handleDelete($event: UserModel) {
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

  handleCreate() {
    this.dialog.open(CreateUserDialog).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ngOnInit();
      }
    })
  }

  handleEdit(userDto: UserModel) {
    this.dialog.open(EditUserDialog, {
      data: {
        user: userDto
      }
    }).afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.ngOnInit();
      }
    })
  }
}
