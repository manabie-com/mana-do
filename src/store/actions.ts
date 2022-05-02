import { Todo } from '../types/types';
import { SET_TODO, CREATE_TODO, UPDATE_TODO_STATUS, DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_ALL_TODOS, EDIT_TODO } from './constants';
import { SetTodoAction, CreateTodoAction, UpdateTodoStatusAction, DeleteTodoAction, DeleteAllTodosAction, ToggleAllTodosAction, EditTodoAction } from './types';

// Set To Dos Action
export const setToDos = (todos: Array<Todo>): SetTodoAction => {
  return {
    type: SET_TODO,
    payload: todos
  }
}

// create To Do Action
export const createToDo = (newTodo: Todo): CreateTodoAction => {
  return {
    type: CREATE_TODO,
    payload: newTodo
  }
}

// Edit To Do Action
export const editToDo = (todoId: string, todoContent: string): EditTodoAction => {
  return {
    type: EDIT_TODO,
    payload: { todoId, todoContent }
  }
}

// Update To Do Status Action
export const updateToDoStatus = (todoId: number, checked: boolean):UpdateTodoStatusAction => {
  return {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId,
      checked
    }
  }
}

// Delete To Do Action
export const deleteToDo = (todoId: string): DeleteTodoAction => {
  return {
    type: DELETE_TODO,
    payload: todoId
  }
}

// Delete All To Do Action
export const deleteAllToDos = (): DeleteAllTodosAction => {
  return {
    type: DELETE_ALL_TODOS,
  }
}

// Toggle All To Do Action
export const toggleAllToDos = (checked: boolean): ToggleAllTodosAction => {
  return {
    type: TOGGLE_ALL_TODOS,
    payload: checked
  }
}
