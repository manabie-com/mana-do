import { Themes, Todo, TodoLoadingStatus, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  FILTER_STATUS_CHANGED,
  TODO_LOADING,
  SET_TODO,
  SET_THEME,
} from "./actions";
import { createTodo, findTodoIndexById, updateTodoStatus } from "../utils/todoUtils";

export interface AppState {
  theme: string;
  todos: Array<Todo>;
  todosLoadStatus: TodoLoadingStatus;
  filter: {
    status: TodoStatus;
  };
}

export const initialState: AppState = {
  theme: Themes.Light,
  todos: [],
  todosLoadStatus: TodoLoadingStatus.Idle,
  filter: {
    status: TodoStatus.All,
  },
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // Do not mutate the origin todos state. We can create a new todos array based on the origin todos arrays
      // by replace the push method by concat method which is created a new array that do not mutate the origin array
      // state.todos.push(action.payload);
      return createTodo(state, action.payload);

    case UPDATE_TODO_STATUS: {
      // const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // state.todos[index2].status = action.payload.checked ? TodoStatus.Completed : TodoStatus.Active;
      return updateTodoStatus(state, action.payload.todoId, action.payload.checked);
    }

    case UPDATE_TODO_CONTENT: {
      const newTodos = [...state.todos];
      const foundIndex = findTodoIndexById(newTodos, action.payload.todoId);
      newTodos[foundIndex].content = action.payload.content;

      return {
        ...state,
        todos: newTodos,
      };
    }

    case TODO_LOADING: {
      return {
        ...state,
        todosLoadStatus: TodoLoadingStatus.Loading,
      };
    }

    case SET_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }

    case SET_TODO: {
      return {
        ...state,
        todosLoadStatus: TodoLoadingStatus.Idle,
        todos: action.payload,
      };
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((todo) => ({
        ...todo,
        status: action.payload ? TodoStatus.Completed : TodoStatus.Active,
      }));

      return {
        ...state,
        todos: tempTodos,
      };
    }

    case FILTER_STATUS_CHANGED:
      return {
        ...state,
        filter: {
          ...state.filter,
          status: action.payload,
        },
      };

    case DELETE_TODO:
      // The splice is mutating the original state, so I will clone the current state to the new one and mutating on it.
      const newTodos = [...state.todos];
      const foundIndex = findTodoIndexById(newTodos, action.payload);
      newTodos.splice(foundIndex, 1);

      return {
        ...state,
        todos: newTodos,
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
