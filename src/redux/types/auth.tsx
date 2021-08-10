export interface AuthReducer {
    token: string | undefined,
    userId: string | undefined
}

export interface AuthForm {
    userId: string,
    password: string
}