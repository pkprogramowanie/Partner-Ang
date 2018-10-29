import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data,
               public dialogRef: MatDialogRef<ConfirmDialogComponent> ) {
    }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
  // yes() {
  //   this.dialogRef.close(ConfirmAnswer.yes);
  // }

  // no() {
  //   this.dialogRef.close(ConfirmAnswer.no);
  // }

}

export enum ConfirmAnswer {
  yes,
  no
}

