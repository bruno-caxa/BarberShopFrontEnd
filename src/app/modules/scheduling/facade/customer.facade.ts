import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerApi } from '../api/customer.api';
import { CustomerModel } from '../model/costumer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerFacade {
  constructor(private api: CustomerApi) {}

  findByCellPhone(cellPhone: string): Observable<CustomerModel> {
    return this.api.findByCellPhone(cellPhone);
  }
}
