import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Mode } from 'src/app/models/Enums/formMode';
import { TasksService } from 'src/app/services/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-manage',
  templateUrl: './task-manage.component.html',
  styleUrls: ['./task-manage.component.scss']
})
export class TaskManageComponent implements OnInit {

  formData = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    proposedEndDate: new FormControl(''),
    status: new FormControl(''),
    coments: new FormControl(''),
    done: new FormControl(''),
    tasks: new FormArray([]),
  });

  id: string;
  mode: Mode;
  title: string;
  buttonContent: string;

  constructor(private db: TasksService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
  }

  onSubmit() {
    console.log(this.formData);

    const newTask: Task = {
      title: this.formData.controls.title.value,
      description: this.formData.controls.description.value,
      proposedEndDate: this.formData.controls.proposedEndDate.value,
      status: this.formData.controls.status.value,
      coments: this.formData.controls.coments.value,
      done: this.formData.controls.done.value,
      // tasks: this.formData.controls.tasks.value,
    };

    console.log('task to save', newTask);

    if (this.mode === Mode.Edit) {
      this.db.update(this.id, newTask);
    } else {
      this.db.add(newTask);
    }
    this.router.navigate(['/Zlecenia']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.mode = Mode.Edit;
     }
    if (this.mode === Mode.Edit) {
      this.title = 'Popraw zadanie';
      this.buttonContent = 'Zapisz';
      this.db.get(this.id).subscribe(data => {
        this.formData.controls.title.setValue(data.get('title'));
        this.formData.controls.description.setValue(data.get('description'));
        this.formData.controls.proposedEndDate.setValue(data.get('proposedEndDate'));
        this.formData.controls.status.setValue(data.get('status'));
        this.formData.controls.coments.setValue(data.get('coments'));
        this.formData.controls.done.setValue(data.get('done'));

        const phones = <FormArray>this.formData.get('phones');
        const phonesFromData = data.get('phones');
      });
    } else {
      this.title = 'Dodaj zadanie';
      this.buttonContent = 'Dodaj';
    }
  }

}
