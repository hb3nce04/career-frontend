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
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {ExportDataDialog} from './export/export';
import {MatDialog} from '@angular/material/dialog';

export interface TableProps {
  pageSize?: number;
  pageSizeOptions?: number[];
}

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  valueFn?: (row: any) => string;
  type?: 'button';
  buttonText?: string;
  buttonAction?: (row: any) => void;
  hideFromExport?: boolean;
}

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
    MatButton,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatCheckbox
  ]
})
export class SharedTable<T> implements AfterViewInit, OnChanges{
  protected loadingService = inject(LoadingService);
  protected dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;

  columns: InputSignal<TableColumn[]> = input.required();
  data: InputSignal<any> = input.required({});
  props: InputSignal<TableProps | undefined> = input();

  allColumns = computed(() => {
    return [{field: 'select', header: ''}, ...this.columns(), { field: 'actions', header: 'Műveletek'}];
  });

  displayedColumns = computed(() => this.allColumns().map((column) => column.field));
  dataSource: MatTableDataSource<never> = new MatTableDataSource([]);

  edit = output<T>();
  delete = output<T>();

  selection = new SelectionModel<T>(true, []);

  ngOnChanges() {
    this.dataSource.data = this.data();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
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

  handleExport() {
    const columns: TableColumn[] = this.columns().filter(col => !col.hideFromExport);
    this.dialog.open(ExportDataDialog, {
      data: {
        data: this.dataSource.data,
        columns,
      }
    })
  }
}
