import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { IAppState } from '../../../store/state/app.state';
import { AddNewUser, EditOneUser } from '../../../store/actions/user.action';
import { IUser } from '../../../users/shared/user';
import { UserFormGroup } from '../../shared/user-form.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalRef: BsModalRef;
  userFormGroup: UserFormGroup = new UserFormGroup();
  @Input()
  user: IUser;
  editable = false;
  formSubmitted = false;

  constructor(
    private store: Store<IAppState>,
    private modalService: BsModalService) { }

  ngOnInit() {
    if (this.user) {
      this.editable = true;
      this.user.balance = this.user.balance.substr(1);
      Object.keys(this.userFormGroup.controls).forEach((prop) => this.userFormGroup.controls[prop].setValue(this.user[prop]));
    }
  }

  hide() {
    this.modalService.hide(1);
  }

  inviteUser(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      const result = this.getValuesFromForm(form);
      this.store.dispatch(new AddNewUser(result));
      this.hide();
      form.reset();
      this.formSubmitted = false;
    }
  }

  getValuesFromForm(form: NgForm) {
    return {
      // tslint:disable-next-line
      _id: form.controls._id.value === null ? `f${(~~( Math.random() * 1e8 ) ).toString(16)}` : form.controls._id.value,
      // tslint:disable-next-line
      guid: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c, r) => ('x' == c ? // tslint:disable
       (r = Math.random( ) *16 | 0) : (r&0x3|0x8)).toString(16)),
      isActive: form.controls.isActive.value,
      balance: `$${form.controls.balance.value}`,
      picture: 'http://placehold.it/32x32',
      age: form.controls.age.value,
      eyeColor: form.controls.eyeColor.value,
      name: form.controls.name.value,
      gender: form.controls.gender.value,
      company: form.controls.company.value,
      email: form.controls.email.value,
      phone: form.controls.phone.value,
      address: form.controls.address.value,
      about: form.controls.about.value,
      registered: new Date().toISOString(),
      latitude: Number(form.controls.latitude.value),
      longitude: Number(form.controls.longitude.value),
      tags: form.controls.tags.value
    };
  }

  onEditUser(form: NgForm) {
    const result = this.getValuesFromForm(form);
    this.store.dispatch(new EditOneUser(result));
    this.hide();
  }
}
