import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public path = '/customers';
  public customers$: Observable<any[]>;
  //////////////////////
  public listRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.listRef = this.db.collection<Customer>(this.path);
    this.list();
   }

  add(customer: Customer) {
    this.listRef.add(customer);
  }

  list(order: string = '', filter: string = ''): Observable<any[]> {
    this.customers$ = this.db.collection(this.path).snapshotChanges();
    return this.customers$;
    // this.db.list(this.path, ref => ref.orderByChild(order).startAt(filter)).snapshotChanges();
  }

  get(id: string) {
    return this.db.collection(this.path).doc(id).get();
  }

  delete(id: string) {
    this.db.collection(this.path).doc(id).delete();
  }

  update(id: string, customer: Customer) {
    this.db.collection(this.path).doc(id).update(customer);
  }
}
