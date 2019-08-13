import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './store/state/app.state';
import { InitState } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new InitState());
  }
}
