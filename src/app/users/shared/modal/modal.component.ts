import { Component, OnInit, Input } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { IAppState } from '../../../store/state/app.state';
import { AddNewUser, EditOneUser } from '../../../store/actions/user.action';
import { IUser } from '../../../users/shared/user';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalRef: BsModalRef;
  @Input()
  user: IUser;
  editable = false;

  newUser: FormGroup = new FormGroup({
    _id: new FormControl(null),
    balance: new FormControl(0),
    name: new FormControl(''),
    age: new FormControl(0),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    about: new FormControl(''),
    tags: new FormControl([]),
    company: new FormControl(''),
    eyeColor: new FormControl(''),
    gender: new FormControl('male'),
    isActive: new FormControl(true),
    latitude: new FormControl(''),
    longitude: new FormControl(''),
    picture: new FormControl(''),
  });

  constructor(
    private store: Store<IAppState>,
    private modalService: BsModalService) { }

  ngOnInit() {
    if (this.user) {
      this.editable = true;
      this.user.balance = this.user.balance.substr(1);
      Object.keys(this.newUser.controls).forEach((prop) => this.newUser.controls[prop].setValue(this.user[prop]));
    }
  }

  hide() {
    this.modalService.hide(1);
  }

  inviteUser(form: NgForm) {
    const result = this.getValuesFromForm(form);
    this.store.dispatch(new AddNewUser(result));
    this.hide();
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
