import {
  ACTION_TYPES,
  IAuthActions,
  IAuthState,
  ILoginFailureAction,
} from "./auth.constant";

export const initialState: IAuthState = {
  isLoading: false,
  isAuthenticated: false,
  errorMessage: "",
};

const authReducer = (
  state: IAuthState = initialState,
  action: IAuthActions
) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    }
    case ACTION_TYPES.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errorMessage: "",
      };
    }
    case ACTION_TYPES.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errorMessage: (action as ILoginFailureAction).payload.errorMessage,
      };
    }
    case ACTION_TYPES.VERIFY_TOKEN: {
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: ""
      }
    }
    default:
      return state;
  }
};

export default authReducer;
