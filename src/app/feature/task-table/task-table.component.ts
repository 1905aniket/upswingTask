import { Component, Signal, signal } from '@angular/core';
import { TaskStore } from '../../store/task-store';
import { CommonModule } from '@angular/common';
import { ModalPopupComponent } from '../../shared/components/modal-popup/modal-popup.component';
import { CommonServiceService } from '../../services/common-service.service';
import { Task } from '../../shared/models/task-model';

@Component({
  selector: 'app-task-table',
  imports: [CommonModule,ModalPopupComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {

  tasks:Signal<Task[]> = signal<Task[]>([]);
  isEdit: boolean = false

  constructor(private store: TaskStore,private _commonService:CommonServiceService) {
    this.tasks = this.store.tasks;
  }

  delete(id: string) {
    this.store.deleteTask(id);
  }

  edit(taskId:string){
    this.isEdit = true;
    this._commonService.setId(taskId);
  }
}
