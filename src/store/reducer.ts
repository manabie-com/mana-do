import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  EDIT_TODO,
  EDIT_TODO_TEXT,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      }
    }

    case CREATE_TODO: {
      // After useReducer dispatched, React components will render again with the "new state" from useReducer
      // If we mutate the state.todos here, useReducer is going udpate the view with the mutated state.todos
      // So in this case, we see todo item added twice and cause bugs
      const todos = [...state.todos, action.payload];

      return {
        ...state,
        todos: todos
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const todos = [...state.todos];
      todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: todos
      }
    }

    case EDIT_TODO: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const todos = [...state.todos];
      todos[index].isEditing = action.payload.isEditing;

      return {
        ...state,
        todos: todos
      }
    }

    case EDIT_TODO_TEXT: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const todos = [...state.todos];
      todos[index].content = action.payload.content;

      return {
        ...state,
        todos: todos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const todos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: todos
      }
    }

    case DELETE_TODO: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      const todos = [...state.todos];
      todos.splice(index, 1);

      return {
        ...state,
        todos: todos
      }
    }

    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: []
      }
    }

    default:
      return state;
  }
}

export default reducer;