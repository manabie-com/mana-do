import { Todo, TodoStatus, TODO_KEYS } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  SET_TODO,
  EDIT_TODO,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>;
}

const setDataToLocalStorage = (data: Todo[]) => {
  localStorage.setItem(TODO_KEYS.todos, JSON.stringify(data));
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return { ...state, todos: action.payload };

    case CREATE_TODO:
      const cloneCreatedTodos = [...state.todos, action.payload];
      setDataToLocalStorage(cloneCreatedTodos);

      return {
        ...state,
        todos: cloneCreatedTodos,
      };
    case EDIT_TODO:
      const cloneUpdateTodos = [...state.todos];
      const editTodoIndex = cloneUpdateTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      cloneUpdateTodos[editTodoIndex].content = action.payload.content;
      setDataToLocalStorage(cloneUpdateTodos);

      return {
        ...state,
        todos: cloneUpdateTodos,
      };

    case UPDATE_TODO_STATUS:
      const cloneUpdateStatusTodos = [...state.todos];
      const updateStatusIndex = cloneUpdateStatusTodos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      cloneUpdateStatusTodos[updateStatusIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      setDataToLocalStorage(cloneUpdateStatusTodos);

      return {
        ...state,
        todos: cloneUpdateStatusTodos,
      };

    case TOGGLE_ALL_TODOS:
      const cloneUpdateAllStatusTodos = [...state.todos];
      const newStatusTodos = cloneUpdateAllStatusTodos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      setDataToLocalStorage(newStatusTodos);
      return {
        ...state,
        todos: newStatusTodos,
      };

    case DELETE_TODO:
      const cloneRemovedTodos = [...state.todos];
      const removeIndex = cloneRemovedTodos.findIndex(
        (todo) => todo.id === action.payload
      );
      cloneRemovedTodos.splice(removeIndex, 1);

      setDataToLocalStorage(cloneRemovedTodos);
      return {
        ...state,
        todos: cloneRemovedTodos,
      };
    case DELETE_ALL_TODOS:
      setDataToLocalStorage([]);

      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
