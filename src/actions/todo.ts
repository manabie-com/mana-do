import { Todo } from "../models/todo";
import { ActionTypes } from "../constants";
import { Action } from "./commons";

export function setTodos(todos: Array<Todo>): Action<Array<Todo>> {
    return {
        type: ActionTypes.SET_TODO,
        payload: todos
    }
}


export function createTodo(newTodo: Todo): Action<Todo> {
    return {
        type: ActionTypes.CREATE_TODO,
        payload: newTodo
    }
}

export function updateTodoStatus(todoId: string, checked: boolean): Action<{ todoId: string, checked: boolean }> {
    return {
        type: ActionTypes.UPDATE_TODO_STATUS,
        payload: {
            todoId,
            checked
        }
    }
}

export function deleteTodo(todoId: string): Action<string> {
    return {
        type: ActionTypes.DELETE_TODO,
        payload: todoId
    }
}


export function deleteAllTodos(): Action<never> {
    return {
        type: ActionTypes.DELETE_ALL_TODOS,
    }
}

export function toggleAllTodos(checked: boolean): Action<boolean> {
    return {
        type: ActionTypes.TOGGLE_ALL_TODOS,
        payload: checked
    }
}