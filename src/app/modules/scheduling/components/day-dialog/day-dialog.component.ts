import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, map, Observable, of, shareReplay, startWith } from 'rxjs';
import { ScheduleModel } from '../../model/schedule.model';
import { ScheduleCustomerDialogComponent } from '../schedule-customer-dialog/schedule-customer-dialog.component';

@Component({
  selector: 'app-day-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './day-dialog.component.html',
  styleUrl: './day-dialog.component.scss',
})
export class DayDialogComponent {
  private readonly startHour = 9;
  private readonly endHour = 19;
  private readonly hours = Array.from(
    { length: this.endHour - this.startHour + 1 },
    (_, i) => this.startHour + i
  );

  slots$!: Observable<{ hour: number; customerName: string }[] | null>;

  readonly dialog = inject(MatDialog);

  constructor(
    private dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: Date;
      schedules$: Observable<ScheduleModel[]>;
    } | null
  ) {
    const emptySlots = of(
      this.hours.map((h) => ({ hour: h, customerName: '' }))
    ).pipe(startWith(null));

    if (!this.data?.schedules$) {
      this.slots$ = emptySlots;
    } else {
      this.slots$ = this.data.schedules$.pipe(
        catchError(() => of<ScheduleModel[]>([])),
        map((schedules) => {
          const byHour = schedules.reduce((acc, s) => {
            if (!s) return acc;
            const time = s.haircutDate ? new Date(s.haircutDate) : null;
            if (!time || isNaN(time.getTime())) return acc;
            const hour = time.getHours();
            const name =
              (s as any)?.customer?.name ?? (s as any)?.customerName ?? '';
            if (name) acc.set(hour, name);
            return acc;
          }, new Map<number, string>());

          return this.hours.map((h) => ({
            hour: h,
            customerName: byHour.get(h) ?? '',
          }));
        }),
        startWith(null),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
  }

  close() {
    this.dialogRef.close();
  }

  onClickScheduleCustomer(date: Date, hour: number) {
    const refDialog = this.dialog.open(ScheduleCustomerDialogComponent, {
      data: {
        date: date,
        hour: hour,
      },
      width: '400px',
    });
  }
}
