import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_ID,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  console.log("action", action);
  console.log("state", state);
  let newTodo = JSON.parse(JSON.stringify(state.todos));
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        // todos: [...state.todos, action.payload],
        todos: action.payload,
      };
    case CREATE_TODO:
      newTodo.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      console.log("index2", index2);

      return {
        ...state,
        todos: state.todos,
      };
    case UPDATE_TODO_ID:
      console.log("payload:", action.payload);
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      // state.todos[index3].status = action.payload.content
      //   ? TodoStatus.COMPLETED
      //   : TodoStatus.ACTIVE;
      console.log("index3", index3);

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        console.log("e", e);
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
      const filtered = newTodo.filter(
        (item: any) => item.id !== action.payload
      );

      localStorage.setItem("todos", JSON.stringify(filtered));

      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      index1 > -1 && state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos,
      };
    case DELETE_ALL_TODOS:
      localStorage.removeItem("todos");
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;
