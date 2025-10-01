import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';

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

  onDayClicked(event: any): void {
    this.openCalendarDayClicked(event.day.date.getDate());
  }

  openCalendarDayClicked(number: number): void {

  }
}
