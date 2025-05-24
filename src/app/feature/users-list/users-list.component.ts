import { Component, signal, Signal } from '@angular/core';
import { UserStore } from '../../store/users-store';
import { CommonModule } from '@angular/common';
import { ModalPopupComponent } from '../../shared/components/modal-popup/modal-popup.component';
import { User } from '../../shared/models/users-modal';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule, ModalPopupComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  usersList: Signal<User[]> = signal<User[]>([]);
  isEdit: boolean = false;

  constructor(private store: UserStore, private _commonService: CommonServiceService) {
    this.usersList = this.store.users;
  }

  delete(id: string) {
    this.store.deleteUser(id);
  }
  edit(user: User) {
    this.isEdit = true;
    this._commonService.setId(user.id);
  }
}
