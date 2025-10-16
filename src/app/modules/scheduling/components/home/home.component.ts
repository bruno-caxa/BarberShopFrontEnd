import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { Observable } from 'rxjs';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { ScheduleModel } from '../../model/schedule.model';
import { DayDialogComponent } from './dialog/day-dialog.component';

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

  currentDate: string = '';

  constructor(private facade: ScheduleFacade) {}

  onDayClicked(event: any): void {
    const isoLocalDate = this.toLocalIsoDate(event.day.date);
    this.currentDate = isoLocalDate;
    this.openDayDialog();
  }

  openDayDialog(): void {
    const refDialog = this.dialog.open(DayDialogComponent, {
      data: {
        date: this.currentDate,
        schedules$: this.getSchedulesByDate(this.currentDate),
      },
      width: '400px',
    });

    refDialog.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  getSchedulesByDate(date: string): Observable<ScheduleModel[]> {
    return this.facade.getSchedulesByDate(date);
  }

  private toLocalIsoDate(date: Date): string {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${m}-${d}`;
  }
}
