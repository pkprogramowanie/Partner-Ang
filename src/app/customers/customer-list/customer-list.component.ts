import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { MatDialogConfig, MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CustomerManageComponent } from '../customer-manage/customer-manage.component';
import { FormControl } from '@angular/forms';
import { CustomerTagsService } from 'src/app/services/customer-tags.service';

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

  tagFilter = new FormControl();
  tagList: string[] = ['apteka'];

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
    // this.tagFilter.valueChanges.subscribe(ft => {
    //   this.customersToDatatable.filterPredicate = this.filterDataTable;
      // this.customersToDatatable.filteredData = this.customersToDatatable.filteredData.filter(x => {
      //   console.log(x);
      //   if (x.tags) {
      //     return x.tags.indexOf(this.tagList[0]) !== -1;
      //   }
      // });
      // console.log(ft);
      // console.log('filteredData', this.customersToDatatable.filteredData);
    // });
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
      this.customersToDatatable.filterPredicate = this.filterDataTable;
    });
  }

  filterDataTable(data, filter) {
    console.log('data ', this.tagList);
    const result = (data.ID.toLowerCase().indexOf(filter) !== -1 ||
    (data.name !== null && data.name !== undefined && data.name.toLowerCase().indexOf(filter) !== -1) ||
    (data.street !== null && data.street !== undefined && data.street.toLowerCase().indexOf(filter) !== -1) ||
    (data.place !== null && data.place !== undefined && data.place.toLowerCase().indexOf(filter) !== -1)) 
    &&
    (data.tags.some(function(v) {
      return this.tagFilter.value.indexOf(v) >= 0 ;
    })
    );

    if (this.tagFilter) {
      console.log('tagfilter ', this.tagFilter);
    }
    return result;
  }


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
    console.log('apply', this.tagFilter.value);
    this.customersToDatatable.filter = this.filter.trim().toLowerCase();
    this.customersToDatatable = this.filterDataTable(this.customersToDatatable, this.filter);
  }
}
