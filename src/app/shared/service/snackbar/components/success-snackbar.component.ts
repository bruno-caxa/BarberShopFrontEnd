import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface SuccessSnackBarData {
  message: string;
}

@Component({
  selector: 'app-success-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  template: `
    <div class="snackbar-container">
      <span class="snackbar-message">{{ data.message }}</span>
      <div class="snackbar-actions">
        <button mat-icon-button class="btn-true" (click)="onClose()">
          <mat-icon>check</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class SuccessSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SuccessSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SuccessSnackBarData,
  ) {}

  onClose() {
    this.snackBarRef.dismiss();
  }
}
