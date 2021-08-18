import { TodoAction } from "../actions";
import { ActionType } from "../action-types";
import { TodoStatus } from "../../models/todo";
import { Todo } from "../../models/todo";

export interface TodoState {
  todos: Array<Todo>;
}

export const initialState: TodoState = {
  todos: [],
};

function reducer(
  state: TodoState = initialState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case ActionType.CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state,
      };

    case ActionType.UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };

    case ActionType.TOGGLE_ALL_TODOS:
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

    case ActionType.DELETE_TODO:
      const _index = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(_index, 1);

      return {
        ...state,
        todos: state.todos,
      };
    case ActionType.DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    case ActionType.UPDATE_TODO_CONTENT:
      const _index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[_index2].content = action.payload.content;
      return {
        ...state,
        todos: state.todos,
      };
    default:
      return state;
  }
}

export default reducer;
