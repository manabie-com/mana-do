import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO, UPDATE_TODO_CONTENT,
} from "./actions";

export interface ToDoState {
  todos: Array<Todo>;
}

export const initialState: ToDoState = {
  todos: [],
};

function reducer(state: ToDoState, action: AppActions): ToDoState {
  let newToDo = [...state.todos]
  switch (action.type) {
    case SET_TODO: {
      return {
        todos: [...action.payload],
      };
    }
    case CREATE_TODO:
      return {
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      newToDo[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newToDo,
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
      const newState = [...state.todos];
      const index1 = newState.findIndex(
        (todo) => todo.id === action.payload
      );
      newState.splice(index1, 1);

      return {
        ...state,
        todos: newState,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    case UPDATE_TODO_CONTENT:
      let index = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );

      newToDo[index].content = action.payload.content;

      return {
        ...state,
        todos: newToDo,
      };
    default:
      return state;
  }
}

export default reducer;
