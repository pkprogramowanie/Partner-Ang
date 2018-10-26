import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { CustomerManageComponent } from './customers/customer-manage/customer-manage.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AppRoutingModule, appRoutes } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule, MatInputModule, MatCardModule, MatDialogModule, MatNativeDateModule, MAT_DATE_LOCALE, MatPaginatorModule, MatSortModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { TaskManageComponent } from './tasks/task-manage/task-manage.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    CustomerManageComponent,
    CustomerListComponent,
    CustomerDetailComponent,
    TasksListComponent,
    TaskManageComponent,

  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmDialogComponent ]
})
export class AppModule { }
