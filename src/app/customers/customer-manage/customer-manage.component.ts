import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule, FormArray } from '@angular/forms';

import { Customer } from '../../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Mode } from 'src/app/models/Enums/formMode';
import { MatDialog } from '@angular/material';

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
    phones: new FormArray([]),
    emails: new FormArray([])
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
      phones: this.formData.controls.phones.value.map( p => ({ number: p.number, label: p.label }) ),
      emails: this.formData.controls.emails.value.map( e => ({ email: e.email, label: e.label, primary: e.primary }) )
    };

    if (this.mode === Mode.Edit) {
      this.db.update(this.id, newCustomer);
    } else {
      this.db.add(newCustomer);
    }

    this.router.navigate(['/Klienci']);
  }

  addPhone() {
    const arr = <FormArray>this.formData.get('phones');
    arr.push(new FormGroup({ number: new FormControl(null), label: new FormControl(null) } ));
  }

  addEmail() {
    const arr = <FormArray>this.formData.get('emails');
    arr.push(new FormGroup({ email: new FormControl(null), label: new FormControl(null), primary: new FormControl(null) } ));
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

        const phones = <FormArray>this.formData.get('phones');
        data.get('phones').forEach(p => {
          phones.push(new FormGroup({ number: new FormControl(p.number), label: new FormControl(p.label) } ));
        });

        const emails = <FormArray>this.formData.get('emails');
        data.get('emails').forEach(e => {
          emails.push(
            new FormGroup({ email: new FormControl(e.email), label: new FormControl(e.label), primary: new FormControl(e.primary) }  )
            );
        });

      });

    } else {
      this.title = 'Dodaj klienta';
      this.buttonContent = 'Dodaj';
      this.addPhone();
      this.addEmail();
    }
  }


}


