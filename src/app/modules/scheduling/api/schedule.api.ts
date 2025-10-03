import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApi {
  private readonly API = 'api/schedule';

  constructor(private http: HttpClient) {}

  get(): Observable<string> {
    return this.http.get(environment.API + this.API, { responseType: 'text' });
  }
}
