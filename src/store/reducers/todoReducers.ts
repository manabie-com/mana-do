import { TodoStatus } from "../../models/todo";
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO_CONTENT,
} from "../../constants";
import { AppActions } from "../actions/todoActions";
import { ITodoType } from "../types/todoType";

function reducer(state: ITodoType, action: AppActions): ITodoType {
  switch (action.type) {
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    case CREATE_TODO:
      // state.todos.push(action.payload); // Anti pattern, state should not be mutable
      // return {
      //   ...state,
      // };

      return {
        ...state,
        todos: [...state.todos, action.payload], // treat state as immutable
      };

    case UPDATE_TODO_STATUS:
      // const index2 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload.todoId
      // );
      // state.todos[index2].status = action.payload.checked // Anti pattern, state should not be mutable
      //   ? TodoStatus.COMPLETED
      //   : TodoStatus.ACTIVE;

      // return {
      //   ...state,
      //   todos: state.todos,
      // };

      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todoId
            ? {
                ...todo,
                status: action.payload.checked
                  ? TodoStatus.COMPLETED
                  : TodoStatus.ACTIVE,
              }
            : todo
        ),
      };

    case UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: [
          ...state.todos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, content: action.payload.content }
              : todo
          ),
        ],
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
      // const index1 = state.todos.findIndex(
      //   (todo) => todo.id === action.payload
      // );
      // state.todos.splice(index1, 1); // Anti pattern, state should not be mutable

      // return {
      //   ...state,
      //   todos: state.todos,
      // };

      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
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
