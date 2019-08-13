import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { IAppState } from '../state/app.state';
import {
  GetUsersSuccess, EUserActions, GetUserSuccess, GetUser, GetUsers, AddNewUser,
   AddNewUserSuccess, DeleteOneUser, DeleteOneUserSuccess, EditOneUser, EditOneUserSuccess, InitState, InitStateSuccess
} from '../actions/user.action';
import { UserService } from '../../users/shared/user.service';
import { IUserHttp } from '../../users/shared/http-models/user-http.interface';
import { selectUsersList, addNewUser, deleteOneUser } from '../selectors/user.selector';

@Injectable()
export class UserEffects {
  @Effect()
  initState$ = this.actions$.pipe(
    ofType<InitState>(EUserActions.InitState),
    switchMap(() => this.userService.getUsers()),
    switchMap((userHttp: IUserHttp) => {
      return of(new InitStateSuccess(userHttp.users));
    })
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType<GetUser>(EUserActions.GetUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectUsersList))),
    switchMap(([id, users]) => {
      const selectedUsers = users.filter(user => user._id === String(id))[0];
      return of(new GetUserSuccess(selectedUsers));
    })
  );

  @Effect()
  getUsers$ = this.actions$.pipe(
    ofType<GetUsers>(EUserActions.GetUsers),
    switchMap(() => {
      return of(new GetUsersSuccess());
    })
  );

  @Effect()
  addNewUser$ = this.actions$.pipe(
    ofType<AddNewUser>(EUserActions.AddNewUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(addNewUser))),
    switchMap(([newUsers]) => {
      return of(new AddNewUserSuccess(newUsers));
    })
  );

  @Effect()
  deleteOneUser$ = this.actions$.pipe(
    ofType<DeleteOneUser>(EUserActions.DeleteOneUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(deleteOneUser))),
    switchMap(([newUsers]) => {
      return of(new DeleteOneUserSuccess(newUsers));
    })
  );

  @Effect()
  editOneUser$ = this.actions$.pipe(
    ofType<EditOneUser>(EUserActions.EditOneUser),
    map(action => action.payload),
    withLatestFrom(this.store.pipe(select(selectUsersList))),
    switchMap(([editUser]) => {
      return of(new EditOneUserSuccess(editUser));
    })
  );

  constructor(
    private userService: UserService,
    private actions$: Actions,
    private store: Store<IAppState>
  ) {}
}
