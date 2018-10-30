import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['notification', 'success']
  };
  constructor(public snackBar: MatSnackBar) { }

  success(msg) {
    this.snackBar.open(msg, '', this.config);
  }
}
