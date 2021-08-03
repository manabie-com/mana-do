import {
  AuthActions,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  VERIFY_TOKEN
} from './actions';

export interface AuthState {
  error: string;
  isLoading: boolean;
  isAuthenticated?: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: "",
};

function authReducer(state: AuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: "",
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload.error,
      };

    case VERIFY_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
        error: ""
      }
    default:
      return state;
  }
}

export default authReducer;