import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ConfirmSnackBarComponent,
  ConfirmSnackBarData,
} from './components/confirm-snackbar.component';
import {
  ErrorSnackBarComponent,
  ErrorSnackBarData,
} from './components/error-snackbar.component';
import {
  SuccessSnackBarComponent,
  SuccessSnackBarData,
} from './components/success-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration: number = 3000) {
    this.snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: { message } as SuccessSnackBarData,
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success'],
    });
  }

  error(message: string, duration: number = 5000) {
    this.snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: { message } as ErrorSnackBarData,
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error'],
    });
  }

  confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef = this.snackBar.openFromComponent(
        ConfirmSnackBarComponent,
        {
          data: {
            message,
          } as ConfirmSnackBarData,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-confirm'],
          duration: 0, // Não fecha automaticamente
        },
      );

      snackBarRef.afterDismissed().subscribe((result) => {
        resolve(result.dismissedByAction ? result.dismissedByAction : false);
      });

      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });
    });
  }
}
