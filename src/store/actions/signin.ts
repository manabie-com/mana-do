export const LOG_IN = "LOG_IN"

export interface SetLoginAction {
    type: typeof LOG_IN,
    payload: string
  }
  
  export function logIn(token: string): SetLoginAction {
    return {
      type: LOG_IN,
      payload: token
    }
}

export type SignInActions = SetLoginAction 