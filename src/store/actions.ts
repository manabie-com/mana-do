/*
    I has spitted action types and action interfaces into 2 files (actionTypes.ts , actionInterfaces.ts) to make this action file cleaner.
*/

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
import {
    SetTodoAction,
    GetSingleTodoAction,
    EditTodoAction,
    CreateTodoAction,
    UpdateTodoStatusAction,
    DeleteTodoAction,
    DeleteAllTodosAction,
    ToggleAllTodosAction,
    GetTodosAction
} from './actionInterfaces';


export function setTodos(todos: Array<Todo>): SetTodoAction {
    return {
        type: SET_TODO,
        payload: todos
    }
}

export function getTodos(): GetTodosAction {
    return {
        type: GET_TODOS
    }
}

export function getSingleTodo(id: string): GetSingleTodoAction {
    return {
        type: GET_SINGLE_TODO,
        payload: id
    }
}

export function editTodo(id: string, content: string): EditTodoAction {
    return {
        type: EDIT_TODO,
        payload: {
            id,
            content
        }
    }
}

export function createTodo(newTodo: Todo): CreateTodoAction {
    return {
        type: CREATE_TODO,
        payload: newTodo
    }
}

export function updateTodoStatus(todoId: string, checked: boolean): UpdateTodoStatusAction {
    return {
        type: UPDATE_TODO_STATUS,
        payload: {
            todoId,
            checked
        }
    }
}

export function deleteTodo(todoId: string): DeleteTodoAction {
    return {
        type: DELETE_TODO,
        payload: todoId
    }
}

export function deleteAllTodos(): DeleteAllTodosAction {
    return {
        type: DELETE_ALL_TODOS,
    }
}

export function toggleAllTodos(checked: boolean): ToggleAllTodosAction {
    return {
        type: TOGGLE_ALL_TODOS,
        payload: checked
    }
}