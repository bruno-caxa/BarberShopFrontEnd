import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleApi } from '../api/schedule.api';

@Injectable({
  providedIn: 'root',
})
export class ScheduleFacade {
  constructor(private api: ScheduleApi) {}

  get(): Observable<string> {
    return this.api.get();
  }
}
