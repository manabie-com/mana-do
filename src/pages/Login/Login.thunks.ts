import Service from "service"
import * as actions from "./Login.actions"

export const login = (payload: ReqLogin) => dispatch => {
  dispatch(actions.loginRequested())
  return Service.signIn(payload.username, payload.password)
    .then((res:any) => {
      localStorage.setItem("token", res.token)
      return dispatch(actions.loginSuccess(res))
    })
    .catch(err => {
      return Promise.reject(dispatch(actions.loginFailed(err)))
    })
}
