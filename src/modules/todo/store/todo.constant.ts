export const ACTION_TYPES = {
  FETCH_TODOS_REQUEST: "FETCH_TODOS_REQUEST",
  FETCH_TODOS_SUCCESS: "FETCH_TODOS_SUCCESS",
  FETCH_TODOS_FAILURE: "FETCH_TODOS_FAILURE",
  CREATE_TODO_REQUEST: "CREATE_TODO_REQUEST",
  CREATE_TODO_SUCCESS: "CREATE_TODO_SUCCESS",
  CREATE_TODO_FAILURE: "CREATE_TODO_FAILURE",
  DELETE_TODO_REQUEST: "DELETE_TODO_REQUEST",
  DELETE_TODO_SUCCESS: "DELETE_TODO_SUCCESS",
  DELETE_TODO_FAILURE: "DELETE_TODO_FAILURE",
  UPDATE_TODO_REQUEST: "UPDATE_TODO_REQUEST",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAILURE: "UPDATE_TODO_FAILURE",
  SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
  UPDATE_ALL_TODOS_REQUEST: "UPDATE_ALL_TODOS_REQUEST",
  UPDATE_ALL_TODOS_SUCCESS: "UPDATE_ALL_TODOS_SUCCESS",
  UPDATE_ALL_TODOS_FAILURE: "UPDATE_ALL_TODOS_FAILURE",
  DELETE_ALL_TODOS: "DELETE_ALL_TODOS"
};

export enum TodoStatus {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export interface ITodo {
  id: string;
  user_id: string;
  content: string;
  status?: TodoStatus;
  created_date: string;
}

export interface IAction {
  type: string;
}

export interface IFetchTodosSuccessAction extends IAction {
  payload: {
    todos: ITodo[];
  };
}

export interface IFetchTodosFailureAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface ICreateTodoRequestAction extends IAction {
  payload: {
    content: string;
  };
}

export interface ICreateTodoSuccessAction extends IAction {
  payload: {
    todos: ITodo[];
  };
}

export interface ICreateTodoFailureAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface IDeleteTodoRequestAction extends IAction {
  payload: {
    id: string;
  };
}

export interface IDeleteTodoSuccessAction extends IAction {
  payload: {
    todos: ITodo[];
  };
}

export interface IDeleteTodoFailureAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface IUpdateTodoRequestAction extends IAction {
  payload: {
    id: string;
    data: Partial<ITodo>;
  };
}

export interface IUpdateTodoSuccessAction extends IAction {
  payload: {
    todos: ITodo[];
  };
}

export interface IUpdateTodoFailureAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface ISetActiveTabAction extends IAction {
  payload: {
    activeTab: TodoStatus;
  };
}

export interface IUpdateAllTodosRequestAction extends IAction {
  payload: {
    data: Partial<ITodo>;
  };
}

export interface IUpdateAllTodosSuccessAction extends IAction {
  payload: {
    todos: ITodo[];
  };
}

export interface IUpdateAllTodosFailureAction extends IAction {
  payload: {
    errorMessage: string;
  };
}

export interface ITodoState {
  isLoading: boolean;
  errorMessage: string;
  todos: ITodo[];
  activeTab: TodoStatus;
}

export type ITodoActions =
  | IAction
  | IFetchTodosSuccessAction
  | IFetchTodosFailureAction
  | ICreateTodoRequestAction
  | ICreateTodoSuccessAction
  | ICreateTodoFailureAction
  | IDeleteTodoRequestAction
  | IDeleteTodoSuccessAction
  | IDeleteTodoFailureAction
  | IUpdateTodoRequestAction
  | IUpdateTodoSuccessAction
  | IUpdateTodoFailureAction
  | IUpdateAllTodosRequestAction
  | IUpdateAllTodosSuccessAction
  | IUpdateAllTodosFailureAction
  | ISetActiveTabAction;
