import React from 'react';
import {IAuthState} from '../store/auth/AuthReducer';
import {IAuthenticateActions} from '../store/auth/AuthActions';

export interface IAuthContext {
  authState: IAuthState;
  dispatch: (action: IAuthenticateActions) => void;
}

export default React.createContext<{} | object>({});