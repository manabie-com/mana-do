import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

import produce from 'immer'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    // Create a todo
    case CREATE_TODO:
      return produce(state, (draft) => {
        draft.todos.push(action.payload)
      })

    // Update a todo-status based on todo-id
    case UPDATE_TODO_STATUS:
      return produce(state, (draft) => {
        const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
        draft.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      })

    // Check/un-check all todo-list
    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    // DELETE a todo based on todo-id
    case DELETE_TODO:
      return produce(state, (draft) => {
        const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
        draft.todos.splice(index1, 1)
      })

    // DELETE ALL todo list
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }

    default:
      return state;
  }
}

export default reducer;