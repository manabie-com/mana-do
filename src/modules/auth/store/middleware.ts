import { Dispatch } from "react";
import { AuthActions, LoginRequestingAction, loginSuccessfully, loginUnSuccessfully, LOGIN_REQUEST, VERIFY_TOKEN } from "./actions";
import service from "../../../service";

export const handleLogin = (
  dispatch: Dispatch<AuthActions>,
  action: AuthActions
) => {
  const {
    payload: { username, password },
  } = action as LoginRequestingAction;

  return service
    .signIn(username, password)
    .then((token) => {
      localStorage.setItem("token", token);
      dispatch(loginSuccessfully());
    })
    .catch((errorMessage: string) => {
      dispatch(loginUnSuccessfully(errorMessage));
    });
};

export const handleVerifyToken = (dispatch: Dispatch<AuthActions>) => {
  const token = localStorage.getItem("token") as string;
  return service
    .verifyToken(token)
    .then(() => {
      dispatch(loginSuccessfully());
    })
    .catch((errorMessage: string) => {
      localStorage.removeItem("token");
      dispatch(loginUnSuccessfully(errorMessage));
    });
};

export const applyMiddleware =
  (dispatch: Dispatch<AuthActions>) => (action: AuthActions) => {
    dispatch(action);
    switch (action.type) {
      case LOGIN_REQUEST: {
        handleLogin(dispatch, action);
        break;
      }
      case VERIFY_TOKEN: {
        handleVerifyToken(dispatch);
        break;
      }
    }
  };

export default applyMiddleware;