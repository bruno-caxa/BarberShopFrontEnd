import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';
import { toIsoLocalDate } from '../../../../shared/utils/date-utils';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { ScheduleModel } from '../../model/schedule.model';
import { DayDialogComponent } from '../day-dialog/day-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly CalendarView = CalendarView;
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

  openDayDialog(): void {
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

  getSchedulesByDate(date: string): Observable<ScheduleModel[]> {
    return this.facade.getSchedulesByDate(date);
  }
}
