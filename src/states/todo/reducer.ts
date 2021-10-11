import { TO_DO_KEY } from "constants/const";
import { Todo, TodoStatus } from "models/todo";
import { getTokenLocalStorage } from "utils/storage";
import { TodoActions } from "./actions";
import * as types from "./constants";

export interface TodoState {
  todos: Array<Todo>;
}

function _getInitialData() {
  const todoData: string = localStorage.getItem(TO_DO_KEY) || "";
  const token = getTokenLocalStorage();

  if (!todoData || !token) {
    return [];
  }
  const todoDataParse: { [key: string]: Todo[] } = JSON.parse(todoData || "[]");
  return todoDataParse[token] || [];
}
export const initialState: TodoState = {
  todos: _getInitialData(),
};

const todoReducer = (state: TodoState = initialState, action: TodoActions) => {
  switch (action.type) {
    case types.CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case types.UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.todoId) {
            return todo;
          }
          return {
            ...todo,
            status: action.payload.checked
              ? TodoStatus.COMPLETED
              : TodoStatus.ACTIVE,
          };
        }),
      };

    case types.TOGGLE_ALL_TODOS:
      return {
        ...state,
        todos: state.todos.map((todo) => ({
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        })),
      };

    case types.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case types.DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
};

export default todoReducer;
