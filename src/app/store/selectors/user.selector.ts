import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IUserState } from '../state/user.state';

const selectUsers = (state: IAppState) => state.users;

export const selectUsersList = createSelector(
  selectUsers,
  (state: IUserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser
);

export const addNewUser = createSelector(
  selectUsers,
  (state: IUserState) => state.newUser
);

export const deleteOneUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser
);
