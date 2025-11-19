import { Component } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
