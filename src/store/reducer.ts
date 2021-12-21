import { TODOS_KEY } from '../constants';
import { Todo, TodoStatus } from '../models/todo';
import { setItem } from '../utils/localStorage';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload,
      };
    }

    case CREATE_TODO: {
      // We can use the spread operator to copy the state of old todos then push new todo to end of it.
      const newTodos = [...state.todos, action.payload];
      setItem(TODOS_KEY, newTodos);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case UPDATE_TODO_CONTENT: {
      // We need to clone the array of todos before mutate it
      const newTodos = [...state.todos];
      const todoIndex = newTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      if (todoIndex === -1) return state;
      newTodos[todoIndex].content = action.payload.value;
      setItem(TODOS_KEY, newTodos);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case UPDATE_TODO_STATUS: {
      // We need to clone the array of todos before mutate it
      const newTodos = [...state.todos];
      const todoIndex = newTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      if (todoIndex === -1) return state;
      newTodos[todoIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      setItem(TODOS_KEY, newTodos);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case TOGGLE_ALL_TODOS: {
      const newTodos = state.todos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      setItem(TODOS_KEY, newTodos);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case DELETE_TODO: {
      // We need to clone the array of todos before mutate it
      const newTodos = [...state.todos];
      const todoIndex = newTodos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (todoIndex === -1) return state;
      newTodos.splice(todoIndex, 1);
      setItem(TODOS_KEY, newTodos);

      return {
        ...state,
        todos: newTodos,
      };
    }

    case DELETE_ALL_TODOS: {
      setItem(TODOS_KEY, []);

      return {
        ...state,
        todos: [],
      };
    }

    default:
      return state;
  }
}

export default reducer;
