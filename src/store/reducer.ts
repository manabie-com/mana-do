import { Todo, TodoStatus } from "../models/todo";
import storage from "../utils/localStrorage";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SIGN_IN,
  EDIT_TODO,
  SET_TODO,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  token: String;
}

export const initialState: AppState = {
  token: "",
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_TODO:
      const result = action.payload;

      return {
        ...state,
        todos: result,
      };

    case CREATE_TODO:
      // state.todos.push(action.payload)
      // when use React.StrictMode reducer run 2 times -> push return number and update variable 
      // use concat . it return new array not effect variable

      const resultCreate = [action.payload].concat(state.todos);
      storage.setArrayIntoKey("todos", resultCreate);

      return {
        ...state,
        todos: resultCreate,
      };

    case EDIT_TODO:
      const { id, newText } = action.payload;
      const resultEdit = state.todos.map((el) =>
        el.id === id ? { ...el, content: newText } : el
      );
      storage.setArrayIntoKey("todos", resultEdit);

      return {
        ...state,
        todos: resultEdit,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      storage.setArrayIntoKey("todos", state.todos);

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      storage.setArrayIntoKey("todos", tempTodos);

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);
      // used filter -> same create todo

      const resultDelete = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      storage.setArrayIntoKey("todos", resultDelete);

      return {
        ...state,
        todos: resultDelete,
      };
    case DELETE_ALL_TODOS:
      storage.setArrayIntoKey("todos", []);

      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
