import { Todo } from "../models/todo";
import {
    SET_TODO,
    GET_TODOS,
    GET_SINGLE_TODO,
    EDIT_TODO,
    CREATE_TODO,
    DELETE_ALL_TODOS,
    DELETE_TODO,
    TOGGLE_ALL_TODOS,
    UPDATE_TODO_STATUS
} from './actionTypes';

export interface SetTodoAction {
    type: typeof SET_TODO,
    payload: Array<Todo>
}

export interface GetTodosAction {
    type: typeof GET_TODOS,
}

export interface GetSingleTodoAction {
    type: typeof GET_SINGLE_TODO,
    payload: string
}

export interface EditTodoAction {
    type: typeof EDIT_TODO,
    payload: {
        id: string,
        content: string,
    }
}

export interface CreateTodoAction {
    type: typeof CREATE_TODO,
    payload: Todo
}

export interface UpdateTodoStatusAction {
    type: typeof UPDATE_TODO_STATUS,
    payload: {
        todoId: string,
        checked: boolean
    }
}

export interface DeleteTodoAction {
    type: typeof DELETE_TODO,
    payload: string
}

export interface DeleteAllTodosAction {
    type: typeof DELETE_ALL_TODOS,
}

export interface ToggleAllTodosAction {
    type: typeof TOGGLE_ALL_TODOS,
    payload: boolean
}

export type AppActions =
    GetTodosAction |
    GetSingleTodoAction |
    EditTodoAction |
    SetTodoAction |
    CreateTodoAction |
    UpdateTodoStatusAction |
    DeleteTodoAction |
    DeleteAllTodosAction |
    ToggleAllTodosAction;