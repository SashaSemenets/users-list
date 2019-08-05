import { IUser } from '../../models/user';

export interface IUserState {
  users: IUser[];
  selectedUser: IUser;
  newUser: IUser;
}

export const initialUserState: IUserState = {
  users: null,
  selectedUser: null,
  newUser: null
};
