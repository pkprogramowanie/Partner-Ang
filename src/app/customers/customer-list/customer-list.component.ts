import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CustomerManageComponent } from '../customer-manage/customer-manage.component';
import { FormControl } from '@angular/forms';
import { CustomerTagsService } from 'src/app/services/customer-tags.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  customersToDatatable: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['ID', 'name', 'adres', 'place', 'phones', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filter = '';

  tagFilter = new FormControl();
  tagList: string[] = [];

  constructor(private db: CustomersService,
    private router: Router,
    private dialog: MatDialog,
    private customerTagService: CustomerTagsService
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.customerTagService.list().subscribe(list => {
      this.tagList = list.map(el => el.payload.doc.data().tag);
    });
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
          tags: item.payload.doc.data()['tags']
        };
      });
      this.customersToDatatable = new MatTableDataSource(customers);
      this.customersToDatatable.sort = this.sort;
      this.customersToDatatable.paginator = this.paginator;
      this.applyFilter();
      // this.customersToDatatable.filterPredicate = (data, filter) => {
      //   console.log('xx', data, filter);
      //   return true;
      // };
    });
  }

  // filterDataTable(data, filter) {
  //   console.log('dane', data.include(t => t.ID === filter ), filter);
  //   // const result = data.filter;
  //    const result = (data.data.ID.indexOf(filter.searchData) !== -1); // ||
  //   // (data.name !== null && data.name !== undefined && data.name.toLowerCase().indexOf(filter) !== -1) ||
  //   // (data.street !== null && data.street !== undefined && data.street.toLowerCase().indexOf(filter) !== -1) ||
  //   // (data.place !== null && data.place !== undefined && data.place.toLowerCase().indexOf(filter) !== -1))
  //   // &&
  //   // (data.tags.some(function(v) {
  //   //   return this.tagFilter.value.indexOf(v) >= 0 ;
  //   // })
  //   // );

  //   // if (this.tagFilter) {
  //   //   console.log('tagfilter ', this.tagFilter);
  //   // }
  //   return true;
  // }


  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(CustomerManageComponent, dialogConfig);
  }

  onSelectDetail(row) {
    this.router.navigate(['/Klient/' + row.$key]);
  }

  onSearchClear() {
    this.filter = '';
  }

  applyFilter() {
    const filterObject = {
      searchData: this.filter,
      tags: this.tagFilter.value
    };

    this.customersToDatatable.filter = filterObject.searchData;
    this.customersToDatatable.filterPredicate = (data, f) => {
      console.log(data.tags.indexOf(this.tagFilter.value));
      if (
          (
            (data.ID !== null && data.ID !== undefined && data.ID.toLowerCase().indexOf(this.filter) > -1) ||
            (data.name !== null && data.name !== undefined && data.name.toLowerCase().indexOf(this.filter) !== -1) ||
            (data.street !== null && data.street !== undefined && data.street.toLowerCase().indexOf(this.filter) !== -1) ||
            (data.place !== null && data.place !== undefined && data.place.toLowerCase().indexOf(this.filter) !== -1)
          ) &&
          (
            (this.tagFilter.value == null) ||
            (
              (data.tags != null) &&  data.tags.indexOf(this.tagFilter.value) > -1 // funkcja przeszukiwania tagow
            )
          )
      ) {
        return true;
      }
      return false;
    };
    // console.log(this.customersToDatatable);
  }
}
