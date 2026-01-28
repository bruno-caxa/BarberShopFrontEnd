import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface ConfirmSnackBarData {
  message: string;
}

@Component({
  selector: 'app-confirm-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  template: `
    <div class="snackbar-container">
      <span class="snackbar-message">{{ data.message }}</span>
      <div class="snackbar-actions">
        <button mat-icon-button class="btn-true" (click)="onTrue()">
          <mat-icon>check</mat-icon>
        </button>
        <button mat-icon-button class="btn-false" (click)="onFalse()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ConfirmSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ConfirmSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ConfirmSnackBarData,
  ) {}

  onTrue() {
    this.snackBarRef.dismissWithAction();
  }

  onFalse() {
    this.snackBarRef.dismiss();
  }
}
