import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

export interface ErrorSnackBarData {
  message: string;
}

@Component({
  selector: 'app-error-snackbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon],
  template: `
    <div class="snackbar-container">
      <span class="snackbar-message">{{ data.message }}</span>
      <div class="snackbar-actions">
        <button mat-icon-button class="btn-false" (click)="onClose()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class ErrorSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ErrorSnackBarData,
  ) {}

  onClose() {
    this.snackBarRef.dismiss();
  }
}
