export const ACTION_TYPES = {
  AUTHENTICATE: 'AUTHENTICATE',
  AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAIL: 'AUTHENTICATE_FAIL',
  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_FAIL: 'LOGOUT_FAIL',
  AUTO_LOGIN: 'AUTO_LOGIN'
}

export interface IAuthenticateAction {
  type: string;
  username: string;
  password: string;
}

export interface IAuthenticateFailedAction {
  type: string;
  errorMessage: string;
}

export interface IAuthenticateSucceedAction {
  type: string;
  token: string;
}

export interface ILogoutAction {
  type: string;
}

export interface ILogoutActionFailedAction {
  type: string;
  errorMessage: string;
}

export interface ILogoutActionSucceedAction {
  type: string;
}

export interface IAutoLogin {
  type: string;
}

export type IAuthenticateActions =
  IAuthenticateAction |
  IAuthenticateFailedAction |
  IAuthenticateSucceedAction |
  ILogoutAction |
  ILogoutActionFailedAction |
  ILogoutActionSucceedAction |
  IAutoLogin;

const authenticate = (username: string, password: string): IAuthenticateAction => {
  return {
    type: ACTION_TYPES.AUTHENTICATE,
    username: username,
    password: password,
  };
};

const authenticateFailed = (errorMessage: string): IAuthenticateFailedAction => {
  return {
    type: ACTION_TYPES.AUTHENTICATE_FAIL,
    errorMessage,
  };
};

const authenticateSucceed = (token: string): IAuthenticateSucceedAction => {
  return {
    type: ACTION_TYPES.AUTHENTICATE_SUCCESS,
    token,
  };
};


const logout = (): ILogoutAction => {
  return {
    type: ACTION_TYPES.LOGOUT
  };
};

const logoutFailed = (errorMessage: string): ILogoutActionFailedAction => {
  return {
    type: ACTION_TYPES.LOGOUT_FAIL,
    errorMessage,
  };
};

const logoutSucceed = (): ILogoutActionSucceedAction => {
  return {
    type: ACTION_TYPES.LOGOUT_SUCCESS
  };
};

const autoLogin = (): IAutoLogin => {
  return {
    type: ACTION_TYPES.AUTO_LOGIN
  }
}


export default {
  authenticate,
  authenticateFailed,
  authenticateSucceed,
  logout,
  logoutFailed,
  logoutSucceed,
  autoLogin,
}
