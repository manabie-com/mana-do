import { Dispatch, useReducer } from "react";
import { AuthActions } from "./actions";
import applyMiddleware from "./middleware";
import authReducer, { AuthState, initialState } from "./reducer";

const useAuthReducer = (): [AuthState, Dispatch<AuthActions>] => {
  const [state, dispatch]: [AuthState, Dispatch<AuthActions>] = useReducer(authReducer, initialState);
  const middlewareEnhancer = applyMiddleware(dispatch);
  return [state, middlewareEnhancer];
};

export default useAuthReducer;