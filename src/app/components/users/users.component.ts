import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { DeleteOneUser } from '../../store/actions/user.action';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input()
  users: IUser[];
  modalRef: BsModalRef;
  editableUser: IUser;

  constructor(
    private store: Store<IAppState>,
    private modalService: BsModalService,
    private router: Router) {}

  ngOnInit() {}

  onDeleteUser(user: IUser) {
    this.store.dispatch(new DeleteOneUser(user));
  }

  onEditUser(user: IUser, template: TemplateRef<any>) {
    this.editableUser = user;
    this.modalRef = this.modalService.show(template);
  }

  openAddUserModal(template: TemplateRef<any>) {
    this.editableUser = undefined;
    this.modalRef = this.modalService.show(template);
  }

  navigateToUser(id: number) {
    this.router.navigate(['user', id]);
  }
}
