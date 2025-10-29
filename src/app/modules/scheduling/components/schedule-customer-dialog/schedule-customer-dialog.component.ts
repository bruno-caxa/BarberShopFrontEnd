import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-customer-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './schedule-customer-dialog.component.html',
  styleUrl: './schedule-customer-dialog.component.scss',
})
export class ScheduleCustomerDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ScheduleCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: string;
      hour: number;
    } | null
  ) {}

  close() {
    this.dialogRef.close();
  }
}
