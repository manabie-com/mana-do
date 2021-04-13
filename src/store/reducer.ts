import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: []
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        };
      });

      return {
        ...state,
        todos: tempTodos
      };

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      };
    case UPDATE_TODO:
      const toDoIndex = state.todos.findIndex(todo => todo.id === action.payload.todoId);
      if (toDoIndex !== -1) {
        state.todos[toDoIndex].content = action.payload.content
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos
      };
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
