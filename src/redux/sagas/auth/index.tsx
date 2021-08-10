import { Action } from "src/redux/types"
import { call, put, takeLatest } from "redux-saga/effects"
import { LOGIN, LOGIN_SAGA } from "src/redux/reducers/auth"
import { loginAPI } from "src/redux/services"

function* loginSaga(action: Action) {
    try {
        const { data } = action,
            token: Promise<string | undefined> = yield call(loginAPI, data)
        if (Boolean(token)) {
            yield put({
                type: LOGIN_SAGA,
                data: token
            })
        } else {
            throw new Error()
        }
    } catch (err) {
        console.log(err)
    }
}
export function* login() {
    yield takeLatest(LOGIN, loginSaga)
}