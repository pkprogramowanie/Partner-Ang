import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  description: string;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      // this.title = data.title;
     // this.description = data.description;
    }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(ConfirmAnswer.yes);
  }

  no() {
    this.dialogRef.close(ConfirmAnswer.no);
  }

}

export enum ConfirmAnswer {
  yes,
  no
}

