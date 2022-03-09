export const REQUEST = '@Auth/Request'
export const REQUEST_FAIL = '@Auth/Fail'
export const AUTHENTICATE_SUCCESS = '@Auth/AuthenticateSuccess'
export const LOGOUT_SUCCESS = '@Auth/LogoutSuccess'

interface RequestAction {
  type: typeof REQUEST,
}

interface RequestFailAction {
  type: typeof REQUEST_FAIL,
  error: string,
}

interface AuthenticateSuccessAction {
  type: typeof AUTHENTICATE_SUCCESS
  token: string
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS
}

export function request(): RequestAction {
  return { type: REQUEST }
}

export function requestFail(error: string): RequestFailAction {
  return { type: REQUEST_FAIL,error }
}

export function authenticateSuccess(token: string): AuthenticateSuccessAction {
  return { type: AUTHENTICATE_SUCCESS, token }
}

export function logoutSuccess(): LogoutSuccessAction {
  return { type: LOGOUT_SUCCESS }
}

export type Action = RequestAction | RequestFailAction | AuthenticateSuccessAction | LogoutSuccessAction
