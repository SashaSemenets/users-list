import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { IAppState } from '../state/app.state';
import { userReducer } from '../reducers/user.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  users: userReducer
};
