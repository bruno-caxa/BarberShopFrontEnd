import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ScheduleModel } from '../model/schedule.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApi {
  private readonly API = 'api/schedule';

  constructor(private http: HttpClient) {}

  getSchedulesByDate(date: string): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(
      environment.API + this.API + '/' + date
    );
  }

  scheduleCustomer(schedule: ScheduleModel): Observable<any> {
    return this.http.post(environment.API + this.API, schedule);
  }
}
