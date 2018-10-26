import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customersToDatatable: MatTableDataSource<any>;
  displayedColumns: string[] = ['ID', 'name', 'adres', 'place', 'phones', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter = '';

  constructor(private db: CustomersService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.db.list().subscribe(list => {
      const customers = list.map(item => {
        return {
          $key: item.payload.doc.id,
          ID: item.payload.doc.data()['ID'],
          name: item.payload.doc.data()['name'],
          street: item.payload.doc.data()['street'],
          streetNumber: item.payload.doc.data()['streetNumber'],
          place: item.payload.doc.data()['place'],
          phones: item.payload.doc.data()['phones'],
          emails: item.payload.doc.data()['emails'],
        };
      });
      this.customersToDatatable = new MatTableDataSource(customers);
      this.customersToDatatable.sort = this.sort;
      this.customersToDatatable.paginator = this.paginator;
      this.customersToDatatable.filterPredicate = (data, filter) => {
        return (data.name.toLowerCase().indexOf(filter) !== -1 ||
                data.ID.toLowerCase().indexOf(filter) !== -1 ||
                data.street.toLowerCase().indexOf(filter) !== -1 ||
                data.place.toLowerCase().indexOf(filter) !== -1
                );
      };
      // console.log(this.customersToDatatable);
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

  onSearchClear() {
    this.filter = '';
  }

  applyFilter () {
    this.customersToDatatable.filter = this.filter.trim().toLowerCase();
  }
}
