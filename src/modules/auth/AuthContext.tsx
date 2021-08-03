import React, { useContext } from 'react';
import { AuthActions } from './store/actions';
import { AuthState } from './store/reducer';

export interface AuthContext {
  state: AuthState;
  dispatch: (action: AuthActions) => void;
}

export const AuthContext = React.createContext<AuthContext | {}>({});
export const useAuthContext = () => useContext(AuthContext) as AuthContext