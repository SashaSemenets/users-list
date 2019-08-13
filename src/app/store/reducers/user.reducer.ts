import { EUserActions, UserActions } from '../actions/user.action';
import { IUserState, initialUserState } from '../state/user.state';

export const userReducer = (state = initialUserState, action: UserActions): IUserState => {
  switch (action.type) {
    case EUserActions.InitStateSuccess: {
      return {
        ...state,
        users: action.payload
      };
    }
    case EUserActions.GetUsersSuccess: {
      return state;
    }
    case EUserActions.GetUserSuccess: {
      return {
        ...state,
        selectedUser: action.payload
      };
    }
    case EUserActions.AddNewUserSuccess: {
      state.users.push(action.payload);
      return state;
    }
    case EUserActions.DeleteOneUserSuccess: {
      const indexDeleted = state.users.filter((user, index) => {
        if (user._id !== action.payload._id) {
          return index;
        }
      });
      const newState = { ...state };
      newState.users = indexDeleted;
      return newState;
    }
    case EUserActions.EditOneUserSuccess: {
      const indx = state.users.map((user) => {
        return user._id === action.payload._id ? action.payload : user;
      });
      const newState = { ...state };
      newState.users = indx;
      return newState;
    }
    default:
      return state;
  }
};
