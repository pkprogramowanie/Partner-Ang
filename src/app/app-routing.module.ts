import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { CustomerManageComponent } from './customers/customer-manage/customer-manage.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';
import { TasksListComponent } from './tasks/tasks-list/tasks-list.component';
import { TaskManageComponent } from './tasks/task-manage/task-manage.component';

export const appRoutes: Routes = [
  { path: 'NowyKlient',
    component: CustomerManageComponent
  },
  { path: 'Klienci',
    component: CustomerListComponent
  },
  { path: 'Klient/:id',
    component: CustomerDetailComponent
  },
  { path: 'Klient/poprawa/:id',
  component: CustomerManageComponent
  },
  { path: 'NoweZlecenie',
  component: TaskManageComponent
  },
  { path: 'Zlecenia',
  component: TasksListComponent
  },
];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
