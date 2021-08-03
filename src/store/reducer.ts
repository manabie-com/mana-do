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

const getTodosFromStorage = (): Array<Todo> => {
  const data = localStorage.getItem('@todos');
  if (data) {
    return JSON.parse(data);
  }

  return [];
}

const setTodosToStorage = (todos: Array<Todo>) => {
  localStorage.setItem('@todos', JSON.stringify(todos));
}

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: getTodosFromStorage()
}


function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      const todos = state.todos.concat(action.payload);
      setTodosToStorage(todos);

      return {
        ...state,
        todos
      };
    }

    case UPDATE_TODO: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      const todos = [...state.todos];
      todos[index] = action.payload;
      setTodosToStorage(todos);

      return {
        ...state,
        todos
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const todos = [...state.todos];
      todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      setTodosToStorage(todos);

      return {
        ...state,
        todos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const todos = state.todos.map(todo => ({
        ...todo,
        status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      }));
      setTodosToStorage(todos);

      return {
        ...state,
        todos
      }
    }

    case DELETE_TODO: {
      const todos = state.todos.filter(todo => todo.id !== action.payload);
      setTodosToStorage(todos);

      return {
        ...state,
        todos,
      }
    }
    case DELETE_ALL_TODOS: {
      setTodosToStorage([]);

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