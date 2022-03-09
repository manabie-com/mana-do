import React, {
  useContext,
  createContext,
  ReactNode,
  useEffect,
  useReducer,
} from 'react';

import Service from 'service';

import { reducer, AuthProviderState } from './reducer';
import {
  request,
  requestFail,
  authenticateSuccess,
  logoutSuccess,
} from './actions';
import { getKey, setKey } from 'utils';

const tokenKey = 'token';

interface AuthProps extends AuthProviderState {
  logIn: (id: string, password: string) => void;
  logOut: () => void;
}

const initialState: AuthProviderState = {
  token: getKey<string>(tokenKey) || '',
  isLoading: false,
  error: '',
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, isLoading, error } = state;

  useEffect(() => {
    if (!token) return;
    async function verifyToken() {
      dispatch(request());
      try {
        await Service.verifyToken(token);
        dispatch(authenticateSuccess(token));
      } catch (err: any) {
        dispatch(requestFail(err));
      }
    }
    verifyToken();
  }, [token]);

  async function logIn(id: string, password: string): Promise<void> {
    try {
      dispatch(request());
      const newToken = await Service.signIn(id, password);
      setKey<string>(tokenKey, newToken);
      dispatch(authenticateSuccess(newToken));
    } catch (err: any) {
      dispatch(requestFail(err));
    }
  }
  function logOut(): void {
    localStorage.removeItem(tokenKey);
    dispatch(logoutSuccess());
  }

  return (
    <AuthContext.Provider value={{ token, isLoading, error, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
