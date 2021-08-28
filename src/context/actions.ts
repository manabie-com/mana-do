
export const SET_LOG_IN = 'SET_LOG_IN';
export interface SetLogInAction {
  type: typeof SET_LOG_IN,
  payload: string
}

export function setLogin(username: string): SetLogInAction {
  return {
    type: SET_LOG_IN,
    payload: username
  }
}

export type AppActions = SetLogInAction 