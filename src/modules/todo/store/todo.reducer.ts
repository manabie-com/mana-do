import {
  ACTION_TYPES,
  IFetchTodosFailureAction,
  IFetchTodosSuccessAction,
  ISetActiveTabAction,
  ITodoActions,
  ITodoState,
  TodoStatus,
} from "./todo.constant";

export const initialState: ITodoState = {
  isLoading: false,
  errorMessage: "",
  todos: [],
  activeTab: TodoStatus.ALL,
};

const todoReducer = (
  state: ITodoState = initialState,
  action: ITodoActions
) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TODOS_REQUEST:
    case ACTION_TYPES.CREATE_TODO_REQUEST:
    case ACTION_TYPES.DELETE_TODO_REQUEST:
    case ACTION_TYPES.UPDATE_TODO_REQUEST:
    case ACTION_TYPES.UPDATE_ALL_TODOS_REQUEST: {
      return {
        ...state,
        todos: [],
        isLoading: true,
      };
    }
    case ACTION_TYPES.FETCH_TODOS_SUCCESS:
    case ACTION_TYPES.CREATE_TODO_SUCCESS:
    case ACTION_TYPES.DELETE_TODO_SUCCESS:
    case ACTION_TYPES.UPDATE_TODO_SUCCESS:
    case ACTION_TYPES.UPDATE_ALL_TODOS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        todos: (action as IFetchTodosSuccessAction).payload.todos,
        errorMessage: "",
      };
    }
    case ACTION_TYPES.FETCH_TODOS_FAILURE:
    case ACTION_TYPES.CREATE_TODO_FAILURE:
    case ACTION_TYPES.DELETE_TODO_FAILURE:
    case ACTION_TYPES.UPDATE_TODO_FAILURE:
    case ACTION_TYPES.UPDATE_ALL_TODOS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        todos: [],
        errorMessage: (action as IFetchTodosFailureAction).payload.errorMessage,
      };
    }
    case ACTION_TYPES.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: (action as ISetActiveTabAction).payload.activeTab,
      };
    }
    case ACTION_TYPES.DELETE_ALL_TODOS: {
      localStorage.removeItem('todos')
      return {
        ...state,
        todos: []
      }
    }
    default:
      return state;
  }
};

export default todoReducer;
