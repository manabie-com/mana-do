import {
  ACTION_TYPES,
  ILoginFailureAction,
  ILoginRequestAction,
  ILoginRequestPayload,
  ILoginSuccessAction,
  IVerifyTokenAction,
} from "./auth.constant";

const loginRequest = (
  payload: ILoginRequestPayload
): ILoginRequestAction => ({
  type: ACTION_TYPES.LOGIN_REQUEST,
  payload,
});

const loginSuccess = (): ILoginSuccessAction => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

const loginFailure = (errorMessage: string): ILoginFailureAction => ({
  type: ACTION_TYPES.LOGIN_FAILURE,
  payload: {
    errorMessage,
  },
});

const verifyToken = (): IVerifyTokenAction => ({
  type: ACTION_TYPES.VERIFY_TOKEN,
});

export default {
  loginRequest,
  loginSuccess,
  loginFailure,
  verifyToken,
};
