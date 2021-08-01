import { Dispatch } from "react";
import service from "../../../service";
import authAction from "./auth.action";
import { ACTION_TYPES, IAuthActions, ILoginRequestAction } from "./auth.constant";

export const handleLogin = (
  dispatch: Dispatch<IAuthActions>,
  action: IAuthActions
) => {
  const {
    payload: { username, password },
  } = action as ILoginRequestAction;

  return service
    .signIn(username, password)
    .then((token) => {
      localStorage.setItem("token", token);
      dispatch(authAction.loginSuccess());
    })
    .catch((errorMessage: string) => {
      dispatch(authAction.loginFailure(errorMessage));
    });
};

export const handleVerifyToken = (dispatch: Dispatch<IAuthActions>) => {
  const token = localStorage.getItem("token") as string;
  return service
    .verifyToken(token)
    .then(() => {
      dispatch(authAction.loginSuccess());
    })
    .catch((errorMessage: string) => {
      localStorage.removeItem("token");
      dispatch(authAction.loginFailure(errorMessage));
    });
};

export const applyMiddleware =
  (dispatch: Dispatch<IAuthActions>) => (action: IAuthActions) => {
    dispatch(action);
    switch (action.type) {
      case ACTION_TYPES.LOGIN_REQUEST: {
        handleLogin(dispatch, action);
        break;
      }
      case ACTION_TYPES.VERIFY_TOKEN: {
        handleVerifyToken(dispatch);
        break;
      }
    }
  };

export default applyMiddleware;
