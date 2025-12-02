import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { Observable } from 'rxjs';
import { toIsoLocalDate } from '../../../../shared/utils/date-utils';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { ScheduleModel } from '../../model/schedule.model';
import { DayDialogComponent } from '../day-dialog/day-dialog.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule, MatDialogModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  viewDate = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An Event',
    },
  ];

  readonly dialog = inject(MatDialog);

  currentDate: Date = new Date();
  isoLocalDate: string = '';

  constructor(private facade: ScheduleFacade) {}

  onDayClicked(event: any): void {
    this.currentDate = event.day.date;
    this.isoLocalDate = toIsoLocalDate(event.day.date);
    this.openDayDialog();
  }

  prevMonth(): void {
    this.changeMonth(-1);
  }

  nextMonth(): void {
    this.changeMonth(1);
  }

  goToday(): void {
    this.viewDate = new Date();
  }

  isPastDay(date: Date): boolean {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return date.getTime() < today.getTime() ? true : false;
  }

  private changeMonth(month: number): void {
    const d = new Date(this.viewDate.getTime());
    d.setMonth(d.getMonth() + month);
    this.viewDate = new Date(d.getFullYear(), d.getMonth(), 1);
  }

  private openDayDialog(): void {
    const refDialog = this.dialog.open(DayDialogComponent, {
      data: {
        date: this.currentDate,
        schedules$: this.getSchedulesByDate(this.isoLocalDate),
      },
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

    refDialog.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  private getSchedulesByDate(date: string): Observable<ScheduleModel[]> {
    return this.facade.getSchedulesByDate(date);
  }
}
