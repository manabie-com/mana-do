import { Todo, TodoStatus } from "../models/todo";
import { TodoHelpers } from "../utils/helpers";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  GET_ACTIVE_TODOS,
  GET_ALL_TODOS,
  GET_COMPLETED_TODOS,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  // get TodoList from localStorage
  const getTodoStorage = TodoHelpers.getCurrentTodoLst();
  // get only values form todoList
  const todoValues = Object.values(getTodoStorage);

  switch (action.type) {
    case CREATE_TODO:
      TodoHelpers.addOrUpdateTodo(action.payload.id, action.payload);
      const newTodoList = [...state.todos];
      newTodoList.push(action.payload);
      return {
        ...state,
        todos: newTodoList,
      };

    case EDIT_TODO:
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      const newEditTodoLst = [...state.todos];
      newEditTodoLst[todoIndex].content = action.payload.content;
      TodoHelpers.addOrUpdateTodo(action.payload.todoId, {
        content: action.payload.content,
      } as Todo);
      return {
        ...state,
        todos: newEditTodoLst,
      };

    case DELETE_TODO:
      TodoHelpers.removeTodo(action.payload);
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      const newTodos = [...state.todos];
      newTodos.splice(index1, 1);

      return {
        ...state,
        todos: newTodos,
      };

    case DELETE_ALL_TODOS:
      TodoHelpers.clearToDoList();
      return {
        ...state,
        todos: [],
      };
    case GET_ALL_TODOS:
      return {
        ...state,
        todos: todoValues,
      };

    case GET_ACTIVE_TODOS:
      const activeStatusTodo = todoValues.filter(
        (t) => t.status === TodoStatus.ACTIVE
      );
      return {
        ...state,
        todos: activeStatusTodo,
      };

    case GET_COMPLETED_TODOS:
      const completedStatusTodo = todoValues.filter(
        (t) => t.status === TodoStatus.COMPLETED
      );
      return {
        ...state,
        todos: completedStatusTodo,
      };
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      const newUpdateStatusTodoList = [...state.todos];
      const updateStatus = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      newUpdateStatusTodoList[index2].status = updateStatus;
      // update localStorage
      TodoHelpers.addOrUpdateTodo(action.payload.todoId, {
        status: updateStatus,
      } as Todo);
      return {
        ...state,
        todos: newUpdateStatusTodoList,
      };

    case TOGGLE_ALL_TODOS:
      const updateAllStatus = action.payload
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      // save storage
      const listKey = Object.keys(getTodoStorage);
      listKey.map((k) =>
        TodoHelpers.addOrUpdateTodo(k, { status: updateAllStatus } as Todo)
      );
      // update store
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: updateAllStatus,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    default:
      return state;
  }
}

export default reducer;
