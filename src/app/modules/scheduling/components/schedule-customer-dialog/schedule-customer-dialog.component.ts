import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { firstValueFrom } from 'rxjs';
import { ScheduleFacade } from '../../facade/schedule.facade';
import { CustomerModel } from '../../model/costumer.model';
import { ScheduleModel } from '../../model/schedule.model';

@Component({
  selector: 'app-schedule-customer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './schedule-customer-dialog.component.html',
  styleUrl: './schedule-customer-dialog.component.scss',
})
export class ScheduleCustomerDialogComponent {
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(7)]),
    cellPhone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
    ]),
  });

  isLoading = false;

  constructor(
    private facade: ScheduleFacade,
    private dialogRef: MatDialogRef<ScheduleCustomerDialogComponent>,
    private cd: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: Date;
      hour: number;
    } | null
  ) {}

  async onSchedule() {
    this.isLoading = true;
    this.cd.markForCheck();

    try {
      await firstValueFrom(this.facade.scheduleCustomer(this.getSchedule()));
      this.snackBar.open('Agendamento realizado com sucesso', 'Fechar', {
        duration: 3000,
      });
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
      this.snackBar.open('Erro ao agendar. Tente novamente.', 'Fechar', {
        duration: 4000,
      });
      this.dialogRef.close(false);
    } finally {
      this.isLoading = false;
      this.cd.markForCheck();
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  private getSchedule(): ScheduleModel {
    const payload = this.customerForm.value as Partial<CustomerModel>;
    const customer = new CustomerModel(payload);

    const localDateTime = this.formatLocalDateTime(
      this.data!.date,
      this.data!.hour
    );

    const schedule = new ScheduleModel();
    schedule.customer = customer;
    schedule.haircutDate = localDateTime as any;
    return schedule;
  }

  private formatLocalDateTime(date: Date, hour: number): string {
    const dt = new Date(date);
    const y = dt.getFullYear();
    const m = this.pad2(dt.getMonth() + 1);
    const d = this.pad2(dt.getDate());
    const hh = this.pad2(hour);
    return `${y}-${m}-${d}T${hh}:00:00`;
  }

  private pad2(n: number) {
    return String(n).padStart(2, '0');
  }
}
