
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const VERIFY_TOKEN = 'VERIFY_TOKEN';

export interface LoginRequestingPayload {
  username: string;
  password: string;
}

export interface LoginRequestingAction {
  type: typeof LOGIN_REQUEST,
  payload: LoginRequestingPayload
}

export function requestLogin(payload: LoginRequestingPayload): LoginRequestingAction {
  return {
    type: LOGIN_REQUEST,
    payload: payload
  }
}

///////////
export interface LoginSuccessfullAction {
  type: typeof LOGIN_SUCCESS
}

export function loginSuccessfully(): LoginSuccessfullAction {
  return {
    type: LOGIN_SUCCESS
  }
}

//////////////
export interface LoginUnSuccessfulAction {
  type: typeof LOGIN_FAILURE,
  payload: {
    error: string
  }
}

export function loginUnSuccessfully(error: string): LoginUnSuccessfulAction {
  return {
    type: LOGIN_FAILURE,
    payload: {
      error
    }
  }
}

//////////////
export interface VerifyTokenAction {
  type: typeof VERIFY_TOKEN
}

export function verifyToken(): VerifyTokenAction {
  return {
    type: VERIFY_TOKEN
  }
}

export type AuthActions =
  LoginRequestingAction |
  LoginSuccessfullAction |
  LoginUnSuccessfulAction |
  VerifyTokenAction