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
      // why call CREATE_TODO twice?
      return { ...state };

    case UPDATE_TODO_STATUS:
      state.todos[parseInt(action.payload.todoId)].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    // case TOGGLE_TODO:
    //   state.todos[parseInt(action.payload.todoId)].selected = action.payload.checked;
    //   console.log('a')
    //   return { ...state }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      state.todos.splice(parseInt(action.payload), 1);

      return {
        ...state,
        todos: state.todos
      }
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