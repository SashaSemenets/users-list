import { Action } from '@ngrx/store';
import { IUser } from '../../users/shared/user';

export enum EUserActions {
  GetUsers = '[User] Get Users',
  GetUsersSuccess = '[User] Get Users Success',
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  AddNewUser = '[User] Add New User',
  AddNewUserSuccess = '[User] Add New User Success',
  DeleteOneUser = '[User] Delete One User',
  DeleteOneUserSuccess = '[User] Delete One User Success',
  EditOneUser = '[User] Edit One User',
  EditOneUserSuccess = '[User] Edit One User Success'
}

export class GetUsers implements Action {
  public readonly type = EUserActions.GetUsers;
}

export class GetUsersSuccess implements Action {
  public readonly type = EUserActions.GetUsersSuccess;
  constructor(public payload: IUser[]) {}
}

export class GetUser implements Action {
  public readonly type = EUserActions.GetUser;
  constructor(public payload: number) {}
}

export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GetUserSuccess;
  constructor(public payload: IUser) {}
}

export class AddNewUser implements Action {
  public readonly type = EUserActions.AddNewUser;
  constructor(public payload: IUser) {}
}

export class AddNewUserSuccess implements Action {
  public readonly type = EUserActions.AddNewUserSuccess;
  constructor(public payload: IUser) {}
}

export class DeleteOneUser implements Action {
  public readonly type = EUserActions.DeleteOneUser;
  constructor(public payload: IUser) {}
}

export class DeleteOneUserSuccess implements Action {
  public readonly type = EUserActions.DeleteOneUserSuccess;
  constructor(public payload: IUser) {}
}

export class EditOneUser implements Action {
  public readonly type = EUserActions.EditOneUser;
  constructor(public payload: IUser) {}
}

export class EditOneUserSuccess implements Action {
  public readonly type = EUserActions.EditOneUserSuccess;
  constructor(public payload: IUser) {}
}

export type UserActions = GetUsers | GetUsersSuccess | GetUser | GetUserSuccess |
 AddNewUser | AddNewUserSuccess | DeleteOneUser | DeleteOneUserSuccess | EditOneUser | EditOneUserSuccess;
