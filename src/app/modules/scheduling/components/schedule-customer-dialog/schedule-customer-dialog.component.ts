import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { CustomerModel } from '../../model/costumer.model';
import { ScheduleModel } from '../../model/schedule.model';

@Component({
  selector: 'app-schedule-customer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './schedule-customer-dialog.component.html',
  styleUrl: './schedule-customer-dialog.component.scss',
})
export class ScheduleCustomerDialogComponent {
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(10)]),
    cellPhone: new FormControl('', Validators.required),
  });

  constructor(
    private facade: ScheduleFacade,
    private dialogRef: MatDialogRef<ScheduleCustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: Date;
      hour: number;
    } | null
  ) {}

  onSchedule() {
    const payload = this.customerForm.value as Partial<CustomerModel>;
    const customer = new CustomerModel(payload);

    const dt = new Date(this.data!.date);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, '0');
    const d = String(dt.getDate()).padStart(2, '0');
    const hh = String(this.data!.hour).padStart(2, '0');

    const localDateTime = `${y}-${m}-${d}T${hh}:00:00`;

    const schedule = new ScheduleModel();
    schedule.customer = customer;
    schedule.haircutDate = localDateTime as any;

    this.facade.scheduleCustomer(schedule);
  }

  onClose() {
    this.dialogRef.close();
  }
}
