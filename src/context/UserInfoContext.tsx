import React from "react";
import { User, UserInfoState } from "../models/user";
import { Todo } from "../models/todo";
import {
  AppActions,
  SET_LOG_IN
} from "./actions";
type Action =
  | { type: "loggedIn"; payload: { username: string; password: string} }
  | { type: "loggedOut" };
type Dispatch = (action: AppActions) => void;
type UserInfoProvider = { children: React.ReactNode };

const defaultLoginInfo: UserInfoState = {
  isLoggedIn: false,
  username: "",
};

const UserInfoContext = React.createContext<
  { state: UserInfoState; dispatch: Dispatch } | undefined
>(undefined);

function userInfoReducer(state: UserInfoState, action: AppActions) {
  switch (action.type) {
    case SET_LOG_IN : {
      return {
        isLoggedIn: true,
        username: action.payload
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserInfoProvider({ children }: UserInfoProvider) {
  const [state, dispatch] = React.useReducer(userInfoReducer, defaultLoginInfo);

  return (
    <UserInfoContext.Provider value={{ state, dispatch }}>
      {children}
    </UserInfoContext.Provider>
  );
}

function useUserInfo() {
  const context = React.useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}

export { UserInfoProvider, useUserInfo };
