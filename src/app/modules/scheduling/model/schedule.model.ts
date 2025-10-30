import { CustomerModel } from './costumer.model';

export class ScheduleModel {
  id?: number;
  haircutDate: Date = new Date();
  customer: CustomerModel = new CustomerModel();
}
