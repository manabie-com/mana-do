import { Dispatch, useReducer } from "react";
import { IAuthActions, IAuthState } from "./auth.constant";
import applyMiddleware from "./auth.middleware";
import authReducer, { initialState } from "./auth.reducer";

const useAuthReducer = (): [IAuthState, Dispatch<IAuthActions>] => {
  const [state, dispatch]: [IAuthState, Dispatch<IAuthActions>] = useReducer(authReducer, initialState);
  const enhancedDispatch = applyMiddleware(dispatch);
  return [state, enhancedDispatch];
};

export default useAuthReducer;