export const UPDATE_USERNAME = 'UPDATE_USERNAME';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

export type SigninActionTypes = typeof UPDATE_USERNAME
  | typeof UPDATE_PASSWORD

export type UpdateUsernamePayload = {
  value: string
}

export interface UpdateUsernameAction {
  type: typeof UPDATE_USERNAME,
  payload: UpdateUsernamePayload
}

export function updateUsername(payload: UpdateUsernamePayload): UpdateUsernameAction {
  return {
    type: UPDATE_USERNAME,
    payload
  }
}

//------

export type UpdatePasswordPayload = {
  value: string
}

export interface UpdatePasswordAction {
  type: typeof UPDATE_PASSWORD,
  payload: UpdatePasswordPayload
}

export function updatePassword(payload: UpdatePasswordPayload): UpdatePasswordAction {
  return {
    type: UPDATE_PASSWORD,
    payload
  }
}

export type SigninActions = UpdateUsernameAction
  | UpdatePasswordAction