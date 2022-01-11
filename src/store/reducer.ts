import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]') || [], // lấy data từ localStorage
}

export function persistTodos(data: Array<Todo>) {
  localStorage.setItem('todos', JSON.stringify(data));
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    /*
      React uses a rendering engine which depends on the fact that state changes are observable.
      This observation is made by comparing previous state with next state.
      It will alter a virtual dom with the differences and write changed elements back to the dom.
      Avoid mutating original state, create new state for adding new todo.
     */
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: state.todos
      }
    case UPDATE_TODO_CONTENT:
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      const todos = [...state.todos];

      todos[todoIndex] = {
        ...state.todos[todoIndex],
        content: action.payload.content
      };
      return {
        ...state,
        todos,
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
      // Avoid mutating original state, should create new state.
      const newTodos = [...state.todos];
      newTodos.splice(index1, 1);

      return {
        ...state,
        todos: newTodos,
      }
    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos');
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;