import {
  Action,
  REQUEST,
  REQUEST_FAIL,
  AUTHENTICATE_SUCCESS,
  LOGOUT_SUCCESS,
} from './actions';

export interface AuthProviderState {
  token: string;
  isLoading: boolean;
  error: string;
}

export function reducer(
  state: AuthProviderState,
  action: Action
): AuthProviderState {
  switch (action.type) {
    case REQUEST:
      return { ...state, isLoading: true };
    case REQUEST_FAIL:
      const error = action.error;
      return { ...state, isLoading: false, error };
    case AUTHENTICATE_SUCCESS:
      const token = action.token;
      return { ...state, isLoading: false, error: '', token };
    case LOGOUT_SUCCESS:
      return { ...state, token: '' };
    default:
      return state;
  }
}
