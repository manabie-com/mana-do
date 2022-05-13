import { Todo } from '../models/todo';
import { saveToLocalStorage } from '../utils';
import {
  AppActions,
  CREATE_TODO,
  DELETE_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  SET_TODOS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODOS: 
      return {...state, todos: action.payload}
    case CREATE_TODO:
      const todosCreate = [...state.todos, action.payload];
      saveToLocalStorage(todosCreate);
      return {
        ...state,
        todos: todosCreate,
      };

    case UPDATE_TODO_CONTENT:
      const { todoId, content } = action.payload;
      const indexUpdateContent = state.todos.findIndex(
        (todo) => todoId === todo.id
      );
      if (indexUpdateContent > -1) {
        state.todos[indexUpdateContent].content = content;
        saveToLocalStorage([...state.todos]);
      }
      return {
        ...state,
        todos: [...state.todos],
      };

    case UPDATE_TODO_STATUS:
      const { todoIds, status } = action.payload;
      const todos = state.todos;
      todos.forEach((todo) => {
        if (todoIds.includes(todo.id)) {
          todo.status = status;
        }
      });
      saveToLocalStorage(todos);

      return {
        ...state,
        todos,
      };

    case DELETE_TODOS:
      const todosDelete = state.todos.filter(
        (todo) => !action.payload.includes(todo.id)
      );
      saveToLocalStorage(todosDelete);

      return {
        ...state,
        todos: todosDelete,
      };
    default:
      return state;
  }
}

export default reducer;
