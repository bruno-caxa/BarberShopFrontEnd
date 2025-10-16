import { CustomerModel } from './costumer.model';

export class ScheduleModel {
  id = 0;
  haircutDate: Date = new Date();
  customer: CustomerModel = new CustomerModel();
}
