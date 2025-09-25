import { Component } from '@angular/core';
import {
  CalendarEvent,
  CalendarModule,
  CalendarView
} from 'angular-calendar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarModule],
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
}
