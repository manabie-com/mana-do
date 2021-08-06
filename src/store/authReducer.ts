import {
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from './authActions';
import {Action} from '../models/auth'

export type IAuthState = {
    ACCESS_TOKEN: string
}

export const initialState: IAuthState = {
    ACCESS_TOKEN: localStorage.getItem("token") || ""
}

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ACCESS_TOKEN: true
      }
    case LOGIN_FAIL:
        return {
            ...state,
            ACCESS_TOKEN: false
        }
    default:
      return state;
  }
}

export default authReducer;