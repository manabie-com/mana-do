import { Dispatch } from "react";
import {
  ACTION_TYPES,
  ICreateTodoRequestAction,
  IDeleteTodoRequestAction,
  ITodoActions,
  IUpdateAllTodosRequestAction,
  IUpdateTodoRequestAction,
  TodoStatus,
} from "./todo.constant";
import todoAction from "./todo.action";
import service from "../../../service";
import shortid from "shortid";

const fetchTodos = (dispatch: Dispatch<ITodoActions>) => {
  return service
    .getTodos()
    .then((todos) => dispatch(todoAction.fetchTodosSuccess(todos)))
    .catch((errorMessage) =>
      dispatch(todoAction.fetchTodosFailure(errorMessage))
    );
};

const createTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {
    payload: { content },
  } = action as ICreateTodoRequestAction;
  const todo = {
    content,
    created_date: new Date().toISOString(),
    status: TodoStatus.ACTIVE,
    id: shortid(),
    user_id: "firstUser",
  };
  return service
    .createTodo(todo)
    .then((todos) => dispatch(todoAction.createTodoSuccess(todos)))
    .catch((errorMessage) =>
      dispatch(todoAction.createTodoFailure(errorMessage))
    );
};

const deleteTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {
    payload: { id },
  } = action as IDeleteTodoRequestAction;

  return service
    .deleteTodo(id)
    .then((todos) => dispatch(todoAction.deleteTodoSuccess(todos)))
    .catch((errorMessage) =>
      dispatch(todoAction.deleteTodoFailure(errorMessage))
    );
};

const updateTodo = (dispatch: Dispatch<ITodoActions>, action: ITodoActions) => {
  const {
    payload: { id, data },
  } = action as IUpdateTodoRequestAction;

  return service
    .updateTodo(id, data)
    .then((todos) => dispatch(todoAction.updateTodoSuccess(todos)))
    .catch((errorMessage) =>
      dispatch(todoAction.updateTodoFailure(errorMessage))
    );
};

const updateAllTodos = (
  dispatch: Dispatch<ITodoActions>,
  action: ITodoActions
) => {
  const {
    payload: { data },
  } = action as IUpdateAllTodosRequestAction;

  return service
    .updateAllTodos(data)
    .then((todos) => dispatch(todoAction.updateAllTodosSuccess(todos)))
    .catch((errorMessage) =>
      dispatch(todoAction.updateAllTodosFailure(errorMessage))
    );
};

export const applyMiddleware =
  (dispatch: Dispatch<ITodoActions>) => (action: ITodoActions) => {
    dispatch(action);
    switch (action.type) {
      case ACTION_TYPES.FETCH_TODOS_REQUEST: {
        fetchTodos(dispatch);
        break;
      }
      case ACTION_TYPES.CREATE_TODO_REQUEST: {
        createTodo(dispatch, action);
        break;
      }
      case ACTION_TYPES.DELETE_TODO_REQUEST: {
        deleteTodo(dispatch, action);
        break;
      }
      case ACTION_TYPES.UPDATE_TODO_REQUEST: {
        updateTodo(dispatch, action);
        break;
      }
      case ACTION_TYPES.UPDATE_ALL_TODOS_REQUEST: {
        updateAllTodos(dispatch, action)
        break;
      }
    }
  };

export default applyMiddleware;
