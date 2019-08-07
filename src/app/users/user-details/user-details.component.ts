import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IUser } from '../../users/shared/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input()
  user: IUser;

  constructor(private location: Location) {}

  ngOnInit() {
    this.user.registered = this.user.registered.split(' ').join('');
  }

  onBack() {
    this.location.back();
  }
}
