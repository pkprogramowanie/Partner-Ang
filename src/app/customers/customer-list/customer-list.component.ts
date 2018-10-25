import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public customers: any[];

  displayedColumns: string[] = ['ID', 'name', 'adress', 'place', 'actions'];
  filter = '';
  order = '';

  constructor(private db: CustomersService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    // this.serviceDb.path = '/apteki';
    // this.order = 'name';
    this.getCustomers();
  }

  getCustomers(order: string = this.order, filter: string = this.filter) {
    this.db.list().subscribe(list => {
      this.customers = list.map(item => {
        return {
          $key: item.payload.doc.id,
          customer: item.payload.doc.data()
        };
      });
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Potwierdzenie',
      description: 'Czy jesteś pewien że chcesz usunąć?',
    };
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  onAddClick() {
    this.router.navigate(['/NowyKlient']);
  }

  onSelectRow(row) {
    console.log('row', row);
    this.router.navigate(['/Klient/' + row.$key]);
  }

}
