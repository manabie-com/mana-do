import { AuthReducer } from "./auth"
import { TodoReducer } from "./todo"

export * from "./auth"
export * from "./todo"

export interface Action {
    type: string
    [key: string]: any
}

export interface ReducerType {
    auth: AuthReducer,
    todo: TodoReducer
}