import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  public path = '/tasks';
  public tasks$: Observable<any[]>;
  //////////////////////
  public listRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.listRef = this.db.collection<Task>(this.path);
    this.list();
  }

  add(task: Task) {
    this.listRef.add(task);
  }

  list(order: string = '', filter: string = ''): Observable<any[]> {
    this.tasks$ = this.db.collection(this.path).snapshotChanges();
    return this.tasks$;
    // this.db.list(this.path, ref => ref.orderByChild(order).startAt(filter)).snapshotChanges();
  }

  get(id: string) {
    return this.db.collection(this.path).doc(id).get();
  }

  delete(id: string) {
    this.db.collection(this.path).doc(id).delete();
  }

  update(id: string, task: Task) {
    this.db.collection(this.path).doc(id).update(task);
  }
}
