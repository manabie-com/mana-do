import React, { useContext } from 'react';
import { IAuthState, IAuthActions } from './store/auth.constant';

export interface IAuthContext {
  state: IAuthState;
  dispatch: (action: IAuthActions) => void;
}

export const AuthContext = React.createContext<IAuthContext | {}>({});
export const useAuthContext = () => useContext(AuthContext) as IAuthContext