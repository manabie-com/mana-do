import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM,

} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: window.localStorage.getItem("todos") !== null
    ? JSON.parse(window.localStorage.getItem("todos") || "")
    : [],
}

function reducer(state: AppState, action: AppActions): AppState {
  let newTodos = [...state.todos];
  // not use Immer js
  console.log(action.type)
  switch (action.type) {
    case CREATE_TODO:
      newTodos.push(action.payload);
      return {
        ...state,
        todos: newTodos,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: newTodos
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
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      newTodos.splice(index1, 1);
      return {
        ...state,
        todos: newTodos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO_ITEM:
      const indexUpdate = state.todos.findIndex((todo) => todo.id === action.payload.todoId)
      if (indexUpdate >= 0) {
        newTodos[indexUpdate].content = action.payload.textUpdate;
      }
      return {
        ...state,
        todos: newTodos
      }
    default:
      return state;
  }
}

export default reducer;