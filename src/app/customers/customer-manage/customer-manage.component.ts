import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, FormArray } from '@angular/forms';

import { Customer } from '../../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Mode } from 'src/app/models/Enums/formMode';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss']
})
export class CustomerManageComponent implements OnInit {

  formData = new FormGroup({
    ID: new FormControl(''),
    name: new FormControl(''),
    street: new FormControl(''),
    streetNumber: new FormControl(''),
    place: new FormControl(''),
    postalCode: new FormControl(''),
    phones: new FormArray([
        new FormGroup(
          { phone: new FormControl(null), label: new FormControl('') }
          )
        ])
  });

  id: string;
  mode: Mode;
  title: string;
  buttonContent: string;

  constructor(private db: CustomersService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {

    console.log(this.formData);
  }

  onSubmit() {

    const newCustomer: Customer = {
      ID: this.formData.controls.ID.value,
      name: this.formData.controls.name.value,
      street: this.formData.controls.street.value,
      streetNumber: this.formData.controls.streetNumber.value,
      place: this.formData.controls.place.value,
      postalCode: this.formData.controls.postalCode.value,
      phones: this.formData.controls.phones.value.map( p => ({ phone: p.phone, label: p.label, default: false }) )
    };

    if (this.mode === Mode.Edit) {
      this.db.update(this.id, newCustomer);
    } else {
      this.db.add(newCustomer);
    }
    this.router.navigate(['/Klienci']);
  }

  addPhone() {
    console.log('dodaj');
    const arr = <FormArray>this.formData.get('phones');
    arr.push(new FormGroup({ phone: new FormControl(null), label: new FormControl(null), default: new FormControl(false) } ));
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.mode = Mode.Edit;
     }
    if (this.mode === Mode.Edit) {
      this.title = 'Popraw klienta';
      this.buttonContent = 'Zapisz';
      this.db.get(this.id).subscribe(data => {
        this.formData.controls.ID.setValue(data.get('ID'));
        this.formData.controls.name.setValue(data.get('name'));
        this.formData.controls.street.setValue(data.get('street'));
        this.formData.controls.streetNumber.setValue(data.get('streetNumber'));
        this.formData.controls.place.setValue(data.get('place'));
        this.formData.controls.postalCode.setValue(data.get('postalCode'));

        const arr = <FormArray>this.formData.get('phones');
        data.get('phones').forEach(p => {
          arr.push(new FormGroup({ phone: new FormControl(p.phone), label: new FormControl(p.label) } ));
        });

      });

    } else {
      this.title = 'Dodaj klienta';
      this.buttonContent = 'Dodaj';
    }
  }


}


