import {AfterViewInit, Component, computed, inject, input, InputSignal, OnChanges, ViewChild} from '@angular/core';
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
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {LoadingService} from '../../../core/services/loading.service';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

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
    MatProgressSpinner
  ]
})
export class SharedTable implements AfterViewInit, OnChanges{
  protected loadingService = inject(LoadingService);

  @ViewChild(MatSort) sort!: MatSort;

  columns: InputSignal<TableColumn[]> = input.required();
  data: InputSignal<any> = input.required({});

  displayedColumns = computed(() => this.columns().map((column) => column.field));
  dataSource: MatTableDataSource<never> = new MatTableDataSource([]);

  ngOnChanges() {
    this.dataSource.data = this.data();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
