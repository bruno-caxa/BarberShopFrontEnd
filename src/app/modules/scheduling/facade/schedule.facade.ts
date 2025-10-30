import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ScheduleApi } from '../api/schedule.api';
import { ScheduleModel } from '../model/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade {
  constructor(private api: ScheduleApi) {}

  getSchedulesByDate(date: string): Observable<ScheduleModel[]> {
    return this.api.getSchedulesByDate(date);
  }

  scheduleCustomer(schedule: ScheduleModel) {
    this.api.scheduleCustomer(schedule).pipe(take(1)).subscribe();
  }
}
