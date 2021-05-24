import {Dispatch} from 'react';
import service from '../../service';
import AuthActionsCreator, {IAuthenticateAction, ACTION_TYPES, IAuthenticateActions} from './AuthActions';

export const handleAuthenticate = (dispatch: Dispatch<IAuthenticateActions>, action: IAuthenticateActions) => {
  const {username, password} = action as IAuthenticateAction;
  return service.signIn(username, password)
    .then((token) => {
      localStorage.setItem('token', token)
      dispatch(AuthActionsCreator.authenticateSucceed(token))
    })
    .catch((error: string) => {
      dispatch(AuthActionsCreator.authenticateFailed(error))
    });
}

export const handleLogout = (dispatch: Dispatch<IAuthenticateActions>) => {
  localStorage.removeItem('token');
  dispatch(AuthActionsCreator.logoutSucceed());
}

export const handleAutoLogin = (dispatch: Dispatch<IAuthenticateActions>) => {
  const token = localStorage.getItem('token');
  if (token && token.length > 0) {
    dispatch(AuthActionsCreator.authenticateSucceed(token));
  }
}

export const applyAuthenticateSideEffectsMiddleWare = (dispatch: Dispatch<IAuthenticateActions>) => (
  action: IAuthenticateActions
) => {
  dispatch(action);
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATE: {
      handleAuthenticate(dispatch, action);
      break;
    }
    case ACTION_TYPES.LOGOUT: {
      handleLogout(dispatch);
      break;
    }
    case ACTION_TYPES.AUTO_LOGIN: {
      handleAutoLogin(dispatch);
      break;
    }
  }
};

