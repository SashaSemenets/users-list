import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { IUser } from '../../models/user';

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
  }

  onBack() {
    this.location.back();
  }
}
