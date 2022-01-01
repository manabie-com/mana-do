import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
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
      //we shouldn't mutate state directly, we should get a copy of todos array and mutate a new array, then assign it to a new state.
      return {
        ...state, todos: state.todos.concat(action.payload)
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_CONTENT:
      const todos3 = [...state.todos]
      const index3 = todos3.findIndex((todo) => todo.id === action.payload.todoId);
      todos3[index3].content = action.payload.content
      return {
        ...state,
        todos: todos3
      }

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
      //we shouldn't mutate state directly, we should get a copy of todos array and mutate a new array, then assign it to a new state.
      const todos1 = [...state.todos]
      const index1 = todos1.findIndex((todo) => todo.id === action.payload);
      todos1.splice(index1, 1);
      return {
        ...state,
        todos: todos1
      }

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case SET_TODO:
      return {
        ...state
        , todos: action.payload
      }
    default:
      return state;
  }
}

export default reducer;