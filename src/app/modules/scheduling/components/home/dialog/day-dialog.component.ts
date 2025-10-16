import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ScheduleModel } from '../../../model/schedule.model';

@Component({
  selector: 'app-day-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Detalhes do dia</h2>
    <mat-dialog-content>
      <p>Data selecionada: {{ data?.date }}</p>

      <ng-container *ngIf="data?.schedules$ | async as schedules; else loading">
        <ng-container *ngIf="schedules.length; else noItems">
          <div *ngFor="let s of schedules; let i = index">
            <p>
              <strong>{{ s.customer.name }}</strong> —
              {{ s.customer.cellPhone }}
            </p>
          </div>
        </ng-container>
      </ng-container>

      <ng-template #loading>Carregando...</ng-template>
      <ng-template #noItems>Nenhum agendamento.</ng-template>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Fechar</button>
    </mat-dialog-actions>
  `,
})
export class DayDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DayDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      date: string;
      schedules$: Observable<ScheduleModel[]>;
    } | null
  ) {}

  close() {
    this.dialogRef.close();
  }
}
