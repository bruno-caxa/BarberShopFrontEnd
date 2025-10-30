export class CustomerModel {
  id?: number;
  name = '';
  cellPhone = '';

  constructor(init?: Partial<CustomerModel>) {
    Object.assign(this, init);
  }
}
