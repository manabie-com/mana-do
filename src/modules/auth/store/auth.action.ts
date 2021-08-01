import {
  AUTH,
  ILoginFailureAction,
  ILoginRequestAction,
  ILoginRequestPayload,
  ILoginSuccessAction,
  IVerifyTokenAction,
} from "./auth.constant";

const loginRequest = (
  payload: ILoginRequestPayload
): ILoginRequestAction => ({
  type: AUTH.LOGIN_REQUEST,
  payload,
});

const loginSuccess = (): ILoginSuccessAction => {
  return {
    type: AUTH.LOGIN_SUCCESS,
  };
};

const loginFailure = (errorMessage: string): ILoginFailureAction => ({
  type: AUTH.LOGIN_FAILURE,
  payload: {
    errorMessage,
  },
});

const verifyToken = (): IVerifyTokenAction => ({
  type: AUTH.VERIFY_TOKEN,
});

export default {
  loginRequest,
  loginSuccess,
  loginFailure,
  verifyToken,
};
