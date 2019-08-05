import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { IAppState } from '../../store/state/app.state';
import { selectSelectedUser } from '../../store/selectors/user.selector';
import { GetUser } from '../../store/actions/user.action';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user$ = this.store.pipe(select(selectSelectedUser));

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.store.dispatch(new GetUser(this.route.snapshot.params.id));
  }
}
