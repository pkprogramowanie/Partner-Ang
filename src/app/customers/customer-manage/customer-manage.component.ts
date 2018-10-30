import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { Customer } from '../../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Mode } from 'src/app/models/Enums/formMode';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-customer-manage',
  templateUrl: './customer-manage.component.html',
  styleUrls: ['./customer-manage.component.scss']
})
export class CustomerManageComponent implements OnInit {

  formData: FormGroup = new FormGroup({
    ID: new FormControl('', Validators.required),
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

  constructor(private db: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CustomerManageComponent>,
    private notificationSercice: NotificationService,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data ? data.$key : null;
  }

  onSubmit() {
    // console.log(this.formData);

    const validPhones = this.formData.controls.phones.value.filter(function (el) {
      return el.number != null;
    });
    const validEmails = this.formData.controls.emails.value.filter(function (el) {
      return el.email != null;
    });
    if (this.formData.valid) {
      const newCustomer: Customer = {
        ID: this.formData.controls.ID.value,
        name: this.formData.controls.name.value,
        street: this.formData.controls.street.value,
        streetNumber: this.formData.controls.streetNumber.value,
        place: this.formData.controls.place.value,
        postalCode: this.formData.controls.postalCode.value,
        phones: validPhones.map(p => ({ number: p.number, label: p.label })),
        emails: validEmails.map(e => ({ email: e.email, label: e.label, primary: e.primary }))
      };

      // console.log('newcustomer' , newCustomer);
      if (this.mode === Mode.Edit) {
        this.db.update(this.id, newCustomer);
        this.notificationSercice.success('Poprawiono');
      } else {
        this.db.add(newCustomer);
        this.notificationSercice.success('Dodano');
      }
      this.formData.reset();
      this.dialogRef.close();
      // this.router.navigate(['/Klienci']);
    }
  }

  addPhone() {
    const arr = <FormArray>this.formData.get('phones');
    arr.push(new FormGroup({ number: new FormControl(null), label: new FormControl(null) }));
  }

  addEmail() {
    const arr = <FormArray>this.formData.get('emails');
    arr.push(new FormGroup({
      email: new FormControl(null, Validators.email),
      label: new FormControl(null), primary: new FormControl(null)
    }));
  }

  onClose() {
    this.dialogRef.close();
  }

  ngOnInit() {

    // this.route.snapshot.paramMap.get('id');
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
        const phonesFromData = data.get('phones');
        if (phonesFromData != null) {
          phonesFromData.forEach(p => {
            phones.push(new FormGroup({ number: new FormControl(p.number), label: new FormControl(p.label) }));
          });
        }
        const emails = <FormArray>this.formData.get('emails');
        const emailsFromData = data.get('emails');
        if (emailsFromData != null) {
          emailsFromData.forEach(e => {
            emails.push(
              new FormGroup({ email: new FormControl(e.email), label: new FormControl(e.label), primary: new FormControl(e.primary) })
            );
          });
        }
      });
    } else {
      this.title = 'Dodaj klienta';
      this.buttonContent = 'Dodaj';
      this.addPhone();
      this.addEmail();
    }
  }
}


