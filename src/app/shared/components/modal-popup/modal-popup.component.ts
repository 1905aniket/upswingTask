import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TaskAddEditComponent } from '../../../feature/task-add-edit/task-add-edit.component';
import { UsersAddEditComponent } from '../../../feature/users-add-edit/users-add-edit.component';
import { ProductAddEditComponent } from '../../../feature/product-add-edit/product-add-edit.component';
declare var bootstrap: any;

@Component({
  selector: 'app-modal-popup',
  imports: [CommonModule,TaskAddEditComponent,UsersAddEditComponent,ProductAddEditComponent],
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.scss'
})
export class ModalPopupComponent implements OnChanges{

  @ViewChild('taskModal') taskModal!: ElementRef;

  @Input() isViewStatus:string = '';
  @Input() isEditView:boolean = false;
 
  openModal() {
    const modal = new (window as any).bootstrap.Modal(this.taskModal.nativeElement);
    modal.show();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.isEditView){
        this.editModal();
      }
  }
  editModal() {
    const modal = new (window as any).bootstrap.Modal(this.taskModal.nativeElement);
    modal.show();
  }

  closeModal(){
    const modalElement = this.taskModal.nativeElement;
    const bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();
  }
}
