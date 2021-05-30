/* eslint-disable no-redeclare */
import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS,
  SET_TODO,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
  isLogged: boolean;
}

export const initialState: AppState = {
  todos: [],
  isLogged: false,
};

function storeTodoList(data: Array<Todo>) {
  window.localStorage.setItem("mana-todo-list", JSON.stringify(data));
}

export function addNewTodo(todos: Array<Todo>, todo: Todo) {
  return todos.concat(todo);
}

export function updateTodoStatus(
  todos: Array<Todo>,
  todoId: string,
  status: TodoStatus
) {
  const index = todos.findIndex((todo) => todo.id === todoId);

  todos[index].status = status;
  return todos;
}

export function updateAllTodos(todos: Array<Todo>, status: TodoStatus) {
  return todos.map((todo) => {
    return {
      ...todo,
      status,
    };
  });
}

export function deleteTodo(todos: Array<Todo>, todoId: string) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  todos.splice(index, 1);
  return todos;
}

export function updateTodo(todos: Array<Todo>, todo: Todo) {
  const index = todos.findIndex((item) => item.id === todo.id);

  todos[index] = {
    ...todo,
  };

  return todos;
}

function reducer(state: AppState, action: AppActions): AppState {
  let todos = [...state.todos];

  switch (action.type) {
    case CREATE_TODO:
      const newTodos = addNewTodo(todos, action.payload);

      storeTodoList(newTodos);

      return {
        ...state,
        todos: newTodos,
      };

    case UPDATE_TODO_STATUS:
      todos = updateTodoStatus(
        todos,
        action.payload.todoId,
        action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      );

      storeTodoList(todos);

      return {
        ...state,
        todos,
      };

    case TOGGLE_ALL_TODOS:
      todos = updateAllTodos(
        todos,
        action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      );

      storeTodoList(todos);

      return {
        ...state,
        todos,
      };

    case DELETE_TODO:
      todos = deleteTodo(todos, action.payload);

      storeTodoList(todos);

      return {
        ...state,
        todos: todos,
      };

    case DELETE_ALL_TODOS:
      storeTodoList([]);

      return {
        ...state,
        todos: [],
      };

    case UPDATE_TODO:
      todos = updateTodo(todos, action.payload);

      storeTodoList(todos);

      return {
        ...state,
        todos: todos,
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };

    default:
      return state;
  }
}

export default reducer;
