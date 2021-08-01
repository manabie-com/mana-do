export const ACTION_TYPES = {
  LOGIN_REQUEST: "AUTH_LOGIN_REQUEST",
  LOGIN_SUCCESS: "AUTH_LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH_LOGIN_FAILURE",
  VERIFY_TOKEN: "AUTH_VERIFY_TOKEN",
};

export interface ILoginRequestPayload {
  username: string;
  password: string;
}

export interface ILoginRequestAction {
  type: string;
  payload: ILoginRequestPayload;
}

export interface ILoginSuccessAction {
  type: string;
}

export interface ILoginFailureAction {
  type: string;
  payload: {
    errorMessage: string;
  };
}

export interface IVerifyTokenAction {
  type: string;
}

export type IAuthActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailureAction
  | IVerifyTokenAction;

export interface IAuthState {
  errorMessage: string;
  isLoading: boolean;
  isAuthenticated?: boolean;
}
