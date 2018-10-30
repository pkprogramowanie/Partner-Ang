import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent, ConfirmAnswer } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogService } from 'src/app/services/dialog.service';
import { CustomerManageComponent } from '../customer-manage/customer-manage.component';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

  id = '';
  customer: Customer;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: CustomersService,
    private dialog: MatDialog,
    private dialogConfirmDetete: DialogService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getCustomer(params.id);
    });
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      $key: this.id
    };
    const dialogRef: MatDialogRef<CustomerManageComponent> = this.dialog.open(CustomerManageComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => this.getCustomer(this.id));
  }

  getCustomer($key: string) {
    this.db.get(this.id).subscribe(customer => {
      this.customer = <Customer>customer.data();
    });
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

  onDelete() {
    this.dialogConfirmDetete.openConfirmDialog('Czy jesteś pewien że chcesz usunąć?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.db.delete(this.id);
        this.router.navigate(['/Klienci']);
      }

    });

  }

  onBack() {
    this.router.navigate(['/Klienci']);
  }
}
