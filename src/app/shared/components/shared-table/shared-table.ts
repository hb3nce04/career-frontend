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
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatBadge} from '@angular/material/badge';
import {ConfirmDialog} from '../confirm-dialog/confirm-dialog';

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
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatBadge
  ]
})
export class SharedTable<T> implements AfterViewInit, OnChanges {
  protected loadingService = inject(LoadingService);
  protected dialog = inject(MatDialog);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columns: InputSignal<TableColumn[]> = input.required();
  data: InputSignal<any> = input.required({});
  props: InputSignal<TableProps | undefined> = input();

  allColumns = computed(() => {
    return [{field: 'select', header: ''}, ...this.columns(), {field: 'actions', header: 'Műveletek'}];
  });

  displayedColumns = computed(() => this.allColumns().map((column) => column.field));
  dataSource: MatTableDataSource<never> = new MatTableDataSource([]);

  edit = output<T>();
  delete = output<T>();

  selection = new SelectionModel<T>(true, []);

  ngOnChanges() {
    this.dataSource.data = this.data();
  }

  isAllSelected(): boolean {
    const startIndex = this.paginator?.pageIndex * this.paginator?.pageSize;
    const endIndex = startIndex + this.paginator?.pageSize;
    let pageData;
    if (this.dataSource.filter) {
      pageData = this.dataSource.filteredData.slice(startIndex, endIndex)
    } else {
      pageData = this.dataSource.data.slice(startIndex, endIndex)
    }
    return pageData.every(row => this.selection.isSelected(row));
  }

  toggleAllRows() {
    const startIndex = this.paginator?.pageIndex * this.paginator?.pageSize;
    const endIndex = startIndex + this.paginator?.pageSize;
    let pageData;

    if (this.isAllSelected()) {
      this.selection.deselect(...this.dataSource.data);
      return;
    }

    if (this.dataSource.filter) {
      pageData = this.dataSource.filteredData.slice(startIndex, endIndex)
      if (pageData.length === this.dataSource.filteredData.length) {
        this.selection.select(...this.dataSource.filteredData);
        return;
      }
    } else {
      pageData = this.dataSource.data.slice(startIndex, endIndex)
      if (pageData.length === this.dataSource.data.length) {
        this.selection.select(...this.dataSource.data);
        return;
      }
    }

    this.dialog.open(ConfirmDialog, {
      data: {
        title: "Az összes elemet ki szeretnéd jelölni?",
      }
    }).afterClosed().subscribe((selectAll: boolean) => {
      if (selectAll) {
        this.selection.select(...this.dataSource.data);
      } else {
        this.selection.select(...pageData);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
        data: this.selection.isEmpty()
          ? (this.dataSource.filter ? this.dataSource.filteredData : this.dataSource.data)
          : this.selection.selected,
        columns,
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
