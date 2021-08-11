import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';
import {APP_STORAGE_KEYS} from "../utils/appConst"

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem(APP_STORAGE_KEYS.todos) || '[]') || []
}

function reducer(state: AppState, action: AppActions): AppState {
  let todos = state.todos;
  switch (action.type) {
    case CREATE_TODO: {
      todos = [...todos, action.payload]
      break;
    }
    case UPDATE_TODO: {
      const index = todos.findIndex((todo) => todo.id === action.payload.id);
      if (index > -1) {
        todos[index].content = action.payload.content;
      }
      break;
    }
    case UPDATE_TODO_STATUS: {
      const index = todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index > -1) {
        todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        todos = [...state.todos]
      }
      break;
    }
    case TOGGLE_ALL_TODOS: {
      todos = todos.map((e)=>{
        return {...e, status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE}
      })
      break;
    }
    case DELETE_TODO: {
      todos = todos.filter((todo) => todo.id !== action.payload);

      break;
    }
    case DELETE_ALL_TODOS: {
      todos = []
      break;
    }
    default: {
      return state;
    }
  }

  localStorage.setItem(APP_STORAGE_KEYS.todos, JSON.stringify(todos))
  return {...state, todos}
}

export default reducer;
