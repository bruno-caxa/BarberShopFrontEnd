import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { CustomerModel } from '../model/costumer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerApi {
  private readonly API = 'api/customer';

  constructor(private http: HttpClient) {}

  findByCellPhone(cellPhone: string): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(
      environment.API + this.API + '/cellPhone/' + cellPhone
    );
  }
}
