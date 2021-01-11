import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

const storage = localStorage.getItem('todos') ? localStorage.getItem('todos') : [];

const Storage = (todos: Array<Todo>) => {
  localStorage.setItem('todos', JSON.stringify(todos.length > 0 ? todos : []));
}

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(storage as string) as Array<Todo>
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      Storage(state.todos);
      return {
        ...state
      };


    case EDIT_TODO:
      const indexEdit = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[indexEdit].content = action.payload.content ? action.payload.content : '';

      Storage(state.todos);

      return {
        ...state,
        todos: state.todos
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      Storage(state.todos);

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
      state.todos = tempTodos;

      Storage(state.todos);

      return {
        ...state,
        todos: state.todos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      Storage(state.todos);

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      state.todos = [];
      Storage(state.todos);
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;