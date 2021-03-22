import * as React from "react";
import { useReducer } from "react";
import { UserActions } from "../actions/userActions";
import reducer from "../reducers/userReducers";
import { UserType } from "../types/userType";

export const UserContext = React.createContext([{}, {}] as [
  UserType,
  React.Dispatch<UserActions>
]);

const initialState: UserType = {
  user_id: "",
  username: "",
};

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
