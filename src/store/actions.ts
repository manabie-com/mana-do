import { Todo, TodoStatus, UpdateTodoData } from '../models/todo'
import {
  GetTodoAction,
  GetTodoSuccessAction,
  CreateTodoAction,
  CreateTodoSuccessAction,
  UpdateTodoAction,
  UpdateTodoSuccessAction,
  DeleteTodoAction,
  DeleteTodoSuccessAction,
  DeleteAllTodosAction,
  DeleteAllTodosSuccessAction,
  ToggleAllTodosAction,
  ToggleAllTodosSuccessAction,
} from '../types/actions'
import {
  GET_TODOS,
  GET_TODOS_SUCCESS,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_ALL_TODOS,
  DELETE_ALL_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS,
  TOGGLE_ALL_TODOS_SUCCESS,
} from '../config/constants'

export function getTodos(): GetTodoAction {
  return { type: GET_TODOS }
}

export function getTodosSuccess(todos: Array<Todo>): GetTodoSuccessAction {
  return {
    type: GET_TODOS_SUCCESS,
    payload: todos,
  }
}

export function createTodo(content: string): CreateTodoAction {
  return {
    type: CREATE_TODO,
    payload: content,
  }
}

export function createTodoSuccess(neTodo: Todo): CreateTodoSuccessAction {
  return {
    type: CREATE_TODO_SUCCESS,
    payload: neTodo,
  }
}

export function updateTodo(todoId: string, data: any): UpdateTodoAction {
  return { type: UPDATE_TODO, payload: { todoId, ...data } }
}

export function updateTodoSuccess(todoId: string, data: UpdateTodoData): UpdateTodoSuccessAction {
  return { type: UPDATE_TODO_SUCCESS, payload: { todoId, ...data } }
}

export function deleteTodo(todoId: string): DeleteTodoAction {
  return { type: DELETE_TODO, payload: todoId }
}

export function deleteTodoSuccess(todoId: string): DeleteTodoSuccessAction {
  return { type: DELETE_TODO_SUCCESS, payload: todoId }
}

export function deleteAllTodos(): DeleteAllTodosAction {
  return { type: DELETE_ALL_TODOS }
}

export function deleteAllTodosSuccess(): DeleteAllTodosSuccessAction {
  return { type: DELETE_ALL_TODOS_SUCCESS }
}

export function toggleAllTodos(todoIds: string[], checked: boolean): ToggleAllTodosAction {
  return { type: TOGGLE_ALL_TODOS, payload: { todoIds, checked } }
}

export function toggleAllTodosSuccess(
  todoIds: string[],
  status: TodoStatus
): ToggleAllTodosSuccessAction {
  return { type: TOGGLE_ALL_TODOS_SUCCESS, payload: { todoIds, status } }
}
