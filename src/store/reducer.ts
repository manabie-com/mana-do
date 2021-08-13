import { TodoStatus } from "../constants/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      // State  should immutable
      // state.todos.push(action.payload);
      const addNewTodo = [...state.todos, action.payload];
      console.log("addNewTodo", addNewTodo);

      return {
        ...state,
        todos: addNewTodo,
      };

    case UPDATE_TODO_STATUS:
      // State  should immutable

      // const index2 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload.todoId
      // );
      // state.todos[index2].status = action.payload.checked
      //   ? TodoStatus.COMPLETED
      //   : TodoStatus.ACTIVE;

      const updateStateTodos = state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        }
        return item;
      });

      return {
        ...state,
        todos: updateStateTodos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // State  should immutable
      // const index1 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload
      // );
      // state.todos.splice(index1, 1);
      const removeTodos = state.todos.filter(
        (item) => item.id !== action.payload
      );

      return {
        ...state,
        todos: removeTodos,
      };

    case UPDATE_TODO_CONTENT:
      const updateContent = state.todos.map((item) => {
        if (item.id === action.payload.todoId) {
          return {
            ...item,
            content: action.payload.content,
          };
        }
        return item;
      });

      return {
        ...state,
        todos: updateContent,
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
