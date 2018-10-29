import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {
  }

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      disableClose: true,
      width: '400px',
      data: {
        message: msg
      }
    });
  }
}
