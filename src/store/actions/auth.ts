export enum AuthTypes {
  SET_TOKEN = 'SET_TOKEN'
}

interface SetTokenAction {
  type: typeof AuthTypes.SET_TOKEN
  payload: string
}

export const setToken = (payload: string): SetTokenAction => ({
  type: AuthTypes.SET_TOKEN,
  payload
})

export type AuthActionTypes = SetTokenAction
