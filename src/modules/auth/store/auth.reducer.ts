import {
  AUTH,
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
    case AUTH.LOGIN_REQUEST: {
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    }
    case AUTH.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errorMessage: "",
      };
    }
    case AUTH.LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errorMessage: (action as ILoginFailureAction).payload.errorMessage,
      };
    }
    case AUTH.VERIFY_TOKEN: {
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
