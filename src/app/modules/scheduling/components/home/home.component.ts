import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CalendarModule, MatDialogModule],
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

  data$ = this.get();

  constructor(private facade: ScheduleFacade) {}

  get() {
    return this.facade.get();
  }

  onDayClicked(event: any): void {
    this.openCalendarDayClicked(event.day.date.getDate());
  }

  openCalendarDayClicked(number: number): void {}
}
