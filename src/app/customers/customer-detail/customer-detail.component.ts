import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent, ConfirmAnswer } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  id = '';
  customer: Customer;

  constructor(private route: ActivatedRoute, private router: Router, private db: CustomersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.db.get(this.id).subscribe(c => {
        this.customer = <Customer>c.data();
      });

    });
  }

  onClickEdit() {
    this.router.navigate(['/Klient/poprawa/' + this.id]);
  }

  openDialogConfirmDelete() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Potwierdzenie',
      description: 'Czy jesteś pewien że chcesz usunąć?',
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if (data === ConfirmAnswer.yes) {
          this.db.delete(this.id);
          this.router.navigate(['/Klienci']);
        }
      }
    );
  }

  onClickDelete() {
    this.openDialogConfirmDelete();
  }

  onBack() {
    this.router.navigate(['/Klienci']);
  }
}
