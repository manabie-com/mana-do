import { type } from 'os';
import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  // TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      if (state.todos.indexOf(action.payload) < 0) state.todos.push(action.payload);

      localStorage.setItem('todos', JSON.stringify(state.todos))
      return { ...state };

    case UPDATE_TODO_STATUS:
      state.todos[parseInt(action.payload.todoId)].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem('todos', JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      localStorage.setItem('todos', JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const removedTodos = state.todos.filter((e) => e.id !== action.payload)

      localStorage.setItem('todos', JSON.stringify(removedTodos))
      return {
        ...state,
        todos: removedTodos
      }
    case DELETE_ALL_TODOS:

      localStorage.setItem('todos', JSON.stringify([]))
      return {
        ...state,
        todos: []
      }
    default:
      state.todos.push(...action.payload)
      return { ...state };
  }
}

export default reducer;