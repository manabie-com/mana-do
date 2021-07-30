import { signinKeys } from 'root/models/signin';
import {
  SigninActions,
  UPDATE_USERNAME,
  UPDATE_PASSWORD
} from '../actions/signin.actions'

export interface SigninState {
  [signinKeys.userId]: any,
  [signinKeys.password]: any,
  validated: boolean,
  error: any
}

export const initialState = {
  [signinKeys.userId]: {
    value: '',
    error: {},
    validated: false
  },
  [signinKeys.password]: {
    value: '',
    error: {},
    validated: false
  },
  validated: false,
  error: {}
}

function reducer(state: SigninState, action: SigninActions): SigninState {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        [signinKeys.userId]: {
          ...state[signinKeys.userId],
          value: action.payload.value
        }
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        [signinKeys.password]: {
          ...state[signinKeys.password],
          value: action.payload.value
        }
      };
    default:
      return state;
  }
}

export default reducer;