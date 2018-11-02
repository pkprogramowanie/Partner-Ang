import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { CustomerTag } from '../models/customer-tags';

@Injectable({
  providedIn: 'root'
})
export class CustomerTagsService {
  public path = '/customer-tags';
  public customersTags$: Observable<any[]>;
  //////////////////////
  public listRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.listRef = this.db.collection<CustomerTag>(this.path);
    this.list();
  }

  add(tag: CustomerTag) {
    this.listRef.add(tag);
  }

  list(): Observable<any[]> {
    this.customersTags$ = this.db.collection(this.path).snapshotChanges();
    return this.customersTags$;
  }

  get(id: string) {
    return this.db.collection(this.path).doc(id).get();
  }

  delete(id: string) {
    this.db.collection(this.path).doc(id).delete();
  }

  update(id: string, customer: CustomerTag) {
    this.db.collection(this.path).doc(id).update(customer);
  }

  updateTags(tags: string[]) {
    this.listRef.snapshotChanges().subscribe(
      x => {
        if (tags) {
          tags.forEach(el => {
            if (x.find(d => d.payload.doc.data().tag === el) === undefined) {
              this.add( {
                tag: el
              });
            }
          });
        }
      }
    );
  }
}
