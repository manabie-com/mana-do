import { Todo } from '../models/todo';
import {
  deleteTodo,
  editTodo,
  toggleAllTodos,
  updateTodoStatus,
} from '../utils';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
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
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const { todoId, checked } = action.payload;
      const updatedTodos = updateTodoStatus(state.todos, todoId, checked);

      return {
        ...state,
        todos: updatedTodos,
      };

    case TOGGLE_ALL_TODOS:
      const toggledTodos = toggleAllTodos(state.todos, action.payload);

      return {
        ...state,
        todos: toggledTodos,
      };

    case DELETE_TODO:
      const newTodos = deleteTodo(state.todos, action.payload);

      return {
        ...state,
        todos: newTodos,
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case EDIT_TODO:
      const { id, content } = action.payload;
      const edittedTodos = editTodo(state.todos, id, content);

      return {
        ...state,
        todos: edittedTodos,
      };

    default:
      return state;
  }
}

export default reducer;
