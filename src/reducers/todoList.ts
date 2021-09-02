import { Todo, TodoStatus } from "../models/todo";
import {
  TodoActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "actions/TodoListAction";

export interface TodoState {
  todos: Array<Todo>;
}

const localStorageData = JSON.parse(localStorage.getItem("todo") || "null");

export const initialState: TodoState = {
  todos: localStorageData || [],
};

function reducer(state: TodoState, action: TodoActions): TodoState {
  let tmpState: TodoState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case CREATE_TODO:
      tmpState.todos.push(action.payload);
      return {
        ...tmpState,
      };

    case UPDATE_TODO_STATUS:
      const index2 = tmpState.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      tmpState.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...tmpState,
        todos: tmpState.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = tmpState.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...tmpState,
        todos: tempTodos,
      };

    case DELETE_TODO:
      const index1 = tmpState.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      tmpState.todos.splice(index1, 1);

      return {
        ...tmpState,
        todos: tmpState.todos,
      };
    case DELETE_ALL_TODOS:
      return {
        ...tmpState,
        todos: [],
      };
    case UPDATE_TODO_CONTENT:
      const { todoId, content } = action.payload;
      tmpState.todos = tmpState.todos.map((item) => {
        if (item.id === todoId) {
          item.content = content;
        }
        return item;
      });
      return {
        ...tmpState,
      };
    default:
      return tmpState;
  }
}

export default reducer;
