import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
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
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index3 === -1) {
        state.todos.push(action.payload);
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return {
        ...state
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index2 > -1) {
        state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }

      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_CONTENT:
      const index4 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index4 > -1) {
        state.todos[index4].content = action.payload.content;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }

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

      localStorage.setItem('todos', JSON.stringify(tempTodos));

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index1 > -1) {
        state.todos.splice(index1, 1);
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem('todos', '');
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;