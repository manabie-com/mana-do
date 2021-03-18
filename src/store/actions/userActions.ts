import { SET_USER } from "../../constants";
import { User } from "../../models/user";

export interface SetUser {
  type: typeof SET_USER;
  payload: User;
}

export function setUser(user: User): SetUser {
  return {
    type: SET_USER,
    payload: user,
  };
}

export type UserActions = SetUser;
