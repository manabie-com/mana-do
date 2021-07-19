import { SignInActions } from "../actions/signin"

export interface SignInState {
    token: string
}

export const initialState : SignInState = {
    token: ""
}

const signInReducer = (state: SignInState, action: SignInActions): SignInState => {
    switch (action.type) {
        default: 
            return state
    }
}

export default signInReducer