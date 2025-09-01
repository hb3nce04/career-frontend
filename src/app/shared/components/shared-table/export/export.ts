import {Component, inject, signal, WritableSignal} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {NotificationService} from '../../../../core/services/notification.service';
import {saveAs} from 'file-saver';
import {TableColumn} from '../shared-table';
import {FieldConfig, SharedForm} from '../../shared-form/shared-form';

@Component({
  selector: 'app-export-data-dialog',
  template: `
    <h1 mat-dialog-title>Adatok exportálása</h1>
    <mat-dialog-content>
      <app-shared-form [(fields)]="fields" (validSubmit)="this.handleSave($event)" #form/>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button matButton (click)="handleClose()" cdkFocusInitial>Mégsem</button>
      <button matButton (click)="form.handleSubmit()">Mentés</button>
    </mat-dialog-actions>`,
  styles: `
    .mt {
      margin-top: 5rem;
    }
  `,
  imports: [
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatButton,
    ReactiveFormsModule,
    SharedForm
  ]
})
export class ExportDataDialog {
  readonly dialogRef = inject(MatDialogRef<ExportDataDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  protected notificationService = inject(NotificationService);

  fields: WritableSignal<FieldConfig[]> = signal([
    {
      name: 'name',
      label: 'Fájlnév',
      type: 'text',
      autofocus: true,
      validators: [Validators.required],
      hint: 'Formátum: .csv'
    },
    {
      name: 'withTimestamps',
      type: 'toggle',
      label: (val) => val ? "Időbélyeggel" : "Időbélyeg nélkül"
    }
  ]);

  handleSave(values: any) {
    const {name, withTimestamps} = values;
    this.exportData(name, withTimestamps, this.data.columns, this.data.data);
    this.notificationService.open("Adatok sikeresen exportálva!")
    this.dialogRef.close(true);
  }

  handleClose() {
    this.dialogRef.close(false);
  }

  exportData(filename: string, withTimestamps: boolean, columns: TableColumn[], data: any) {
    const rows = [];

    const values = columns.map((col: TableColumn) => {
      return `${col.header}`
    })
    rows.push(values.join(';'));
    data.forEach((row: any) => {
      const values = columns.map((col: TableColumn) => {
        return (col.valueFn ? col.valueFn(row) : row[col.field]) ?? 'N/A';
      });
      rows.push(values.join(';'));
    });

    const csvString = rows.join('\n');
    console.log(csvString)
    const blob = new Blob([csvString], { type: 'text/csv' });
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.TZ]/g, '-').slice(0, -5);
    saveAs(blob, `${filename + (withTimestamps ? '-'+timestamp : '')}.csv`);
  }
}
