import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from '../../store/users-store';
import { CommonModule } from '@angular/common';
import { CommonServiceService } from '../../services/common-service.service';

@Component({
  selector: 'app-users-add-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users-add-edit.component.html',
  styleUrl: './users-add-edit.component.scss'
})
export class UsersAddEditComponent implements OnInit {
  userForm: FormGroup;
  userId: string = '';
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private _userstore: UserStore, private _commonService: CommonServiceService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      role: ['admin', Validators.required],
    });
  }

  ngOnInit(): void {
    this._commonService.getId().subscribe((id) => {
      this.userId = id;
      const user = this._userstore.getUserById(this.userId);
      this.userForm.patchValue({ ...user });
    })

  }
  onSubmit() {
    if (this.userId != '') {
      if (this.userForm.valid) {
        const newTask = {
          ...this.userForm.value,
          createdAt: new Date().toISOString(),
        };
        this._userstore.updateUser({...newTask,id:this.userId});
        this.userForm.reset({ role: 'admin' });
        this.userId = '';
        this.formSubmitted.emit();
      }
    } else {
      if (this.userForm.valid) {
        const newTask = {
          ...this.userForm.value,
          createdAt: new Date().toISOString(),
        };
        this._userstore.addUser(newTask);
        this.userForm.reset({ role: 'admin' });
        this.formSubmitted.emit();
      }
    }

  }


}
