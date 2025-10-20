import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { ScheduleModel } from '../../model/schedule.model';

@Component({
  selector: 'app-day-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
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

  slots$!: Observable<{ hour: number; customerName: string }[]>;

  constructor(
    private dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: string;
      schedules$: Observable<ScheduleModel[]>;
    } | null
  ) {
    const emptySlots = of(
      this.hours.map((h) => ({ hour: h, customerName: '' }))
    );

    if (!this.data?.schedules$) {
      this.slots$ = emptySlots;
    } else {
      this.slots$ = this.data.schedules$.pipe(
        catchError(() => of<ScheduleModel[]>([])),
        map((schedules) => {
          const byHour = new Map<number, string>();

          for (const s of schedules) {
            if (!s) continue;
            const date = s.haircutDate ? new Date(s.haircutDate) : null;
            if (!date || isNaN(date.getTime())) continue;
            const hour = date.getHours();
            const name =
              (s as any)?.customer?.name ?? (s as any)?.customerName ?? '';
            if (name) byHour.set(hour, name);
          }
          return this.hours.map((h) => ({
            hour: h,
            customerName: byHour.get(h) ?? '',
          }));
        }),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}
