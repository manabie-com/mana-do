import { Dispatch } from 'redux';

const nameSpace = 'auth:';

export const LOGIN_SUCCESS = `${nameSpace}LOGIN_SUCCESS`;
export const LOGIN_FAIL = `${nameSpace}LOGIN_FAIL`;

export const actLoginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  }
}
export const actLoginFail = () => {
    return {
      type: LOGIN_FAIL,
    }
  }