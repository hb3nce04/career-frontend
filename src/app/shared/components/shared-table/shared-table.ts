import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnChanges,
  output,
  ViewChild
} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {LoadingService} from '../../../core/services/loading.service';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatPaginator} from '@angular/material/paginator';
import {MatButton} from '@angular/material/button';

export interface TableProps {
  pageSize?: number;
  pageSizeOptions?: number[];
}

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  valueFn?: (value: any) => string;
}

export interface TableRow {}

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.html',
  styleUrl: './shared-table.scss',
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatNoDataRow,
    MatSortModule,
    MatProgressSpinner,
    MatPaginator,
    MatButton
  ]
})
export class SharedTable<T> implements AfterViewInit, OnChanges{
  protected loadingService = inject(LoadingService);

  @ViewChild(MatSort) sort!: MatSort;

  constantColumns: TableColumn[] = [
    { field: 'actions', header: 'Műveletek' }
  ];

  columns: InputSignal<TableColumn[]> = input.required();
  data: InputSignal<any> = input.required({});
  props: InputSignal<TableProps | undefined> = input();

  allColumns = computed(() => {
    return [...this.columns(), ...this.constantColumns];
  });

  displayedColumns = computed(() => this.allColumns().map((column) => column.field));
  dataSource: MatTableDataSource<never> = new MatTableDataSource([]);

  edit = output<T>();
  delete = output<T>();

  ngOnChanges() {
    this.dataSource.data = this.data();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  handleEdit(element: T) {
    this.edit.emit(element);
  }

  handleDelete(element: T) {
    this.delete.emit(element);
  }
}
