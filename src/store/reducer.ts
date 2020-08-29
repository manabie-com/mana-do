import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
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
      return { ...state, todos: action.payload }; // impure to pure in reducer
    case CREATE_TODO:
      localStorage.setItem(
        "listTodos",
        JSON.stringify([...state.todos, action.payload])
      );

      return { ...state, todos: [...state.todos, action.payload] }; // impure to pure in reducer
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      localStorage.setItem(
        "listTodos",
        JSON.stringify([
          ...state.todos.slice(0, index2),
          {
            ...state.todos[index2],
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          },
          ...state.todos.slice(index2 + 1),
        ])
      );
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index2),
          {
            ...state.todos[index2],
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          },
          ...state.todos.slice(index2 + 1),
        ],
      };
    case TOGGLE_ALL_TODOS:
      localStorage.setItem(
        "listTodos",
        JSON.stringify(
          state.todos.map((e) => ({
            ...e,
            status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          }))
        )
      );
      return {
        ...state,
        todos: state.todos.map((e) => ({
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        })),
      };
    case DELETE_TODO:
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      console.log([
        ...state.todos.slice(0, index1),
        ...state.todos.slice(index1 + 1),
      ]);
      localStorage.setItem(
        "listTodos",
        JSON.stringify([
          ...state.todos.slice(0, index1),
          ...state.todos.slice(index1 + 1),
        ])
      );
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index1),
          ...state.todos.slice(index1 + 1),
        ],
      }; // impure to pure in reducer

    case DELETE_ALL_TODOS:
      localStorage.setItem("listTodos", JSON.stringify([]));
      return {
        ...state,
        todos: [],
      };
    case UPDATE_TODO:
      const index3 = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index3),
          { ...action.payload, content: action.payload.content },
          ...state.todos.slice(index3 + 1),
        ],
      };
    default:
      return state;
  }
}

export default reducer;
