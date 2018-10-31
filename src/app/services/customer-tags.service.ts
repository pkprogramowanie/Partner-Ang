import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { CustomerTags } from '../models/customer-tags';

@Injectable({
  providedIn: 'root'
})
export class CustomerTagsService {
  public path = '/customer-tags';
  public customersTags$: Observable<any[]>;
  //////////////////////
  public listRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.listRef = this.db.collection<CustomerTags>(this.path);
    this.list();
   }

  add(customer: CustomerTags) {
    this.listRef.add(customer);
  }

  list(order: string = '', filter: string = ''): Observable<any[]> {
    this.customersTags$ = this.db.collection(this.path).snapshotChanges();
    return this.customersTags$;
    // this.db.list(this.path, ref => ref.orderByChild(order).startAt(filter)).snapshotChanges();
  }

  get(id: string) {
    return this.db.collection(this.path).doc(id).get();
  }

  delete(id: string) {
    this.db.collection(this.path).doc(id).delete();
  }

  update(id: string, customer: CustomerTags) {
    this.db.collection(this.path).doc(id).update(customer);
  }

}
