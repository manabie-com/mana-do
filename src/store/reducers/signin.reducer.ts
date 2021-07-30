import { IField, Modeling } from 'root/components/commons/types';
import signinModel, { ISigninModel, signinKeys } from '../../models/signIn';
import {
  SigninActions,
  UPDATE_USERNAME,
  UPDATE_PASSWORD
} from '../actions/signin.actions'

export interface SigninState {
  [signinKeys.username]: IField,
  [signinKeys.password]: IField
}

export const initialState: Modeling<ISigninModel> = signinModel

function reducer(state: SigninState, action: SigninActions): SigninState {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        [signinKeys.username]: {
          ...state[signinKeys.username],
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