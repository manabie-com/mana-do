import {useReducer, Dispatch} from 'react';
import {applyAuthenticateSideEffectsMiddleWare} from './AuthSideEffects';
import {IAuthenticateActions, ACTION_TYPES, IAuthenticateSucceedAction, IAuthenticateFailedAction} from './AuthActions';


export interface IAuthState {
  token: string | null;
  errorMessage: string | null;
  loading: boolean;
}

const initialState: IAuthState = {
  token: null,
  errorMessage: null,
  loading: false,
};


export const authReducer = (state = initialState, action: IAuthenticateActions): IAuthState => {
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATE: {
      return {
        ...state,
        loading: true,
        errorMessage: null,
      }
    }
    case ACTION_TYPES.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorMessage: null,
        token: (action as IAuthenticateSucceedAction).token
      }
    }
    case ACTION_TYPES.AUTHENTICATE_FAIL: {
      return {
        ...state,
        loading: false,
        errorMessage: (action as IAuthenticateFailedAction).errorMessage
      }
    }
    case ACTION_TYPES.LOGOUT: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.LOGOUT_SUCCESS: {
      return {
        ...state,
        token: null,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
};

const useAuthReducer = (): [IAuthState, Dispatch<IAuthenticateActions>] => {
  const [state, dispatch]: [IAuthState, Dispatch<IAuthenticateActions>] = useReducer(authReducer, initialState);
  const enhancedDispatch = applyAuthenticateSideEffectsMiddleWare(dispatch);
  return [state, enhancedDispatch];
};

export default useAuthReducer;
