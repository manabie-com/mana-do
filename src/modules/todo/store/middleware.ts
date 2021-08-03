import { Dispatch } from "react";
import {
  TodoActions,
  callApiSuccessfully,
  callApiUnSuccessfully,
  CreateTodoAction,
  CREATE_TODO,
  DeleteTodoAction,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  ToggleAllTodosAction,
  TOGGLE_ALL_TODOS,
  UpdateTodoAction, UpdateTodoStatusAction, UPDATE_TODO_CONTENT, UPDATE_TODO_STATUS } from "./actions";
import service from "../../../service";
import { Todo, TodoStatus } from "../../../models/todo";

const getTodos = (dispatch: Dispatch<TodoActions>) => {
  return service
    .getTodos()
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const createTodo = (dispatch: Dispatch<TodoActions>, action: TodoActions) => {
  const {
    payload,
  } = action as CreateTodoAction;
  return service
    .createTodo(payload)
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const deleteTodo = (dispatch: Dispatch<TodoActions>, action: TodoActions) => {
  const {
    payload
  } = action as DeleteTodoAction;

  return service
    .deleteTodo(payload)
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const deleteAllTodos = (dispatch: Dispatch<TodoActions>) => {

  return service
    .deleteAllTodos()
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const toggleAllTodos = (dispatch: Dispatch<TodoActions>, action: TodoActions) => {
  const { payload } = action as ToggleAllTodosAction;
  const status: TodoStatus = payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
  return service
    .toggleAllTodos(status)
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const updateTodoStatus = (dispatch: Dispatch<TodoActions>, action: TodoActions) => {
  const { payload: {checked, todoId} } = action as UpdateTodoStatusAction;
  const todo: Partial<Todo> = {
    id: todoId,
    status: checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
  }
  return service
    .updateTodoStatus(todo)
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

const updateTodo = (dispatch: Dispatch<TodoActions>, action: TodoActions) => {
  const { payload: {todoId, content} } = action as UpdateTodoAction;
  const todo: Partial<Todo> = {
    id: todoId,
    content
  }
  return service
    .updateTodo(todo)
    .then((todos) => dispatch(callApiSuccessfully(todos)))
    .catch((errorMessage) =>
      dispatch(callApiUnSuccessfully(errorMessage))
    );
};

export const applyMiddleware =
  (dispatch: Dispatch<TodoActions>) => (action: TodoActions) => {
    dispatch(action);
    switch (action.type) {
      case SET_TODO: {
        getTodos(dispatch);
        break;
      }
      case CREATE_TODO: {
        createTodo(dispatch, action);
        break;
      }
      case DELETE_TODO: {
        deleteTodo(dispatch, action);
        break;
      }
      case DELETE_ALL_TODOS: {
        deleteAllTodos(dispatch);
        break;
      }
      case TOGGLE_ALL_TODOS: {
        toggleAllTodos(dispatch, action);
        break;
      }
      case UPDATE_TODO_STATUS: {
        updateTodoStatus(dispatch, action);
        break;
      }
      case UPDATE_TODO_CONTENT: {
        updateTodo(dispatch, action);
        break;
      }
    }
  };

export default applyMiddleware;
