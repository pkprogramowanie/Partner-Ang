import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {

  public tasks: any[];

  constructor(private db: TasksService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    // this.serviceDb.path = '/apteki';
    // this.order = 'name';
    this.getTasks();
  }

  getTasks() {
    this.db.list().subscribe(list => {
      this.tasks = list.map(item => {
        return {
          $key: item.payload.doc.id,
          task: item.payload.doc.data()
        };
      });
    });
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Potwierdzenie',
      description: 'Czy jesteś pewien że chcesz usunąć?',
    };
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  onAddClick() {
    this.router.navigate(['/NoweZlecenie']);
  }

  onSelectRow(row) {
    console.log('row', row);
    this.router.navigate(['/Zlecenie/' + row.$key]);
  }


}
