import {Component, computed, inject, input, InputSignal} from '@angular/core';
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
  MatTable
} from '@angular/material/table';
import {LoadingService} from '../../../core/services/loading.service';
import {MatSortModule} from '@angular/material/sort';
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
// TODO: sorting
export class SharedTable {
  protected loadingService = inject(LoadingService);


  columns: InputSignal<TableColumn[]> = input.required();
  data: InputSignal<any> = input.required({});

  displayedColumns = computed(() => this.columns().map((column) => column.field));

}
