import { Action, AuthReducer } from "src/redux/types"
import { v4 } from "uuid"

export const LOGIN: string = "AUTH:LOGIN"
export const LOGIN_SAGA: string = "AUTH:LOGIN_SAGA"

export const LOGOUT: string = "AUTH:LOGOUT"

const initialState: AuthReducer = {
    token: undefined,
    userId: undefined
}

const reducer = (state: AuthReducer = initialState, action: Action): AuthReducer => {
    switch (action.type) {
        case LOGIN_SAGA:
            return { ...state, token: action.data, userId: v4() }
        case LOGOUT:
            return { ...state, token: undefined }
        default:
            return state
    }
}

export default reducer