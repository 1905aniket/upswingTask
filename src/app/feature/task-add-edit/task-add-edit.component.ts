import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStore } from '../../store/task-store';
import { CommonModule } from '@angular/common';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-task-add-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-add-edit.component.html',
  styleUrl: './task-add-edit.component.scss'
})
export class TaskAddEditComponent {

  form: FormGroup;
  taskId: string = '';
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private _taskStore: TaskStore, private _commonService: CommonServiceService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      status: ['Pending', Validators.required],
    });
  }

  ngOnInit(): void {
    this._commonService.getId().subscribe((id) => {
      this.taskId = id;
      const product = this._taskStore.getTaskById(this.taskId);
      this.form.patchValue({ ...product });
    })
  }

  onSubmit() {
    if (this.taskId != '') {
      if (this.form.valid) {
        const newTask = {
          ...this.form.value,
          createdAt: new Date().toISOString(),
        };
        this._taskStore.updateTask({ ...newTask, id: this.taskId });
        this.taskId = '';
        this.form.reset({ status: 'Pending' });
        this.formSubmitted.emit();
      }
    } else {
      if (this.form.valid) {
        const newTask = {
          ...this.form.value,
          createdAt: new Date().toISOString(),
        };
        this._taskStore.addTask(newTask);
        this.form.reset({ status: 'Pending' });
        this.formSubmitted.emit();
      }
    }
  }
}
