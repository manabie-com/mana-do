import {
  ACTION_TYPES,
  IAction,
  ICreateTodoFailureAction,
  ICreateTodoRequestAction,
  ICreateTodoSuccessAction,
  IDeleteTodoFailureAction,
  IDeleteTodoRequestAction,
  IDeleteTodoSuccessAction,
  IFetchTodosFailureAction,
  IFetchTodosSuccessAction,
  ISetActiveTabAction,
  ITodo,
  IUpdateAllTodosFailureAction,
  IUpdateAllTodosRequestAction,
  IUpdateAllTodosSuccessAction,
  IUpdateTodoFailureAction,
  IUpdateTodoRequestAction,
  IUpdateTodoSuccessAction,
  TodoStatus,
} from "./todo.constant";

const fetchTodosRequest = (): IAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS_REQUEST,
  };
};

const fetchTodosSuccess = (todos: ITodo[]): IFetchTodosSuccessAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS_SUCCESS,
    payload: {
      todos,
    },
  };
};

const fetchTodosFailure = (errorMessage: string): IFetchTodosFailureAction => {
  return {
    type: ACTION_TYPES.FETCH_TODOS_SUCCESS,
    payload: {
      errorMessage,
    },
  };
};

const createTodoRequest = (content: string): ICreateTodoRequestAction => {
  return {
    type: ACTION_TYPES.CREATE_TODO_REQUEST,
    payload: {
      content,
    },
  };
};

const createTodoSuccess = (todos: ITodo[]): ICreateTodoSuccessAction => {
  return {
    type: ACTION_TYPES.CREATE_TODO_SUCCESS,
    payload: {
      todos,
    },
  };
};

const createTodoFailure = (errorMessage: string): ICreateTodoFailureAction => {
  return {
    type: ACTION_TYPES.CREATE_TODO_SUCCESS,
    payload: {
      errorMessage,
    },
  };
};

const deleteTodoRequest = (id: string): IDeleteTodoRequestAction => {
  return {
    type: ACTION_TYPES.DELETE_TODO_REQUEST,
    payload: {
      id,
    },
  };
};

const deleteTodoSuccess = (todos: ITodo[]): IDeleteTodoSuccessAction => {
  return {
    type: ACTION_TYPES.DELETE_TODO_SUCCESS,
    payload: {
      todos,
    },
  };
};

const deleteTodoFailure = (errorMessage: string): IDeleteTodoFailureAction => {
  return {
    type: ACTION_TYPES.DELETE_TODO_FAILURE,
    payload: {
      errorMessage,
    },
  };
};

const updateTodoRequest = (
  id: string,
  data: Partial<ITodo>
): IUpdateTodoRequestAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO_REQUEST,
    payload: {
      id,
      data,
    },
  };
};

const updateTodoSuccess = (todos: ITodo[]): IUpdateTodoSuccessAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO_SUCCESS,
    payload: {
      todos,
    },
  };
};

const updateTodoFailure = (errorMessage: string): IUpdateTodoFailureAction => {
  return {
    type: ACTION_TYPES.UPDATE_TODO_FAILURE,
    payload: {
      errorMessage,
    },
  };
};

const setActiveTab = (activeTab: TodoStatus): ISetActiveTabAction => {
  return {
    type: ACTION_TYPES.SET_ACTIVE_TAB,
    payload: {
      activeTab,
    },
  };
};

const updateAllTodosRequest = (data: Partial<ITodo>): IUpdateAllTodosRequestAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_REQUEST,
    payload: {
      data,
    },
  };
};

const updateAllTodosSuccess = (
  todos: ITodo[]
): IUpdateAllTodosSuccessAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_SUCCESS,
    payload: {
      todos,
    },
  };
};

const updateAllTodosFailure = (
  errorMessage: string
): IUpdateAllTodosFailureAction => {
  return {
    type: ACTION_TYPES.UPDATE_ALL_TODOS_FAILURE,
    payload: {
      errorMessage,
    },
  };
};

const deleteAllTodos = () => {
  return {
    type: ACTION_TYPES.DELETE_ALL_TODOS,
  }
}

export default {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  createTodoRequest,
  createTodoSuccess,
  createTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  setActiveTab,
  updateAllTodosRequest,
  updateAllTodosSuccess,
  updateAllTodosFailure,
  deleteAllTodos
};
