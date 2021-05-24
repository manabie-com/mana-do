import {useReducer, Dispatch} from 'react';
import {Todo} from '../../models/todo';
import {
  ITodoActions,
  ACTION_TYPES,
  IFetchTodosSucceedAction,
  IAddTodoSucceedAction,
  IRemoveTodoSucceedAction,
  IUpdateTodoSucceedAction, IRearrangeTodosSucceedAction, IUpdateAllTodosStatusSucceedAction
} from './TodoActions';
import {applyTodoSideEffectsMiddleWare} from './TodoSideEffects';


export interface ITodoState {
  todos: Todo[];
  errorMessage: string | null;
  loading: boolean;
}

const initialState: ITodoState = {
  todos: [],
  errorMessage: null,
  loading: false,
};


export const todoReducer = (state = initialState, action: ITodoActions): ITodoState => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_TODOS: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.FETCH_TODOS_SUCCESS: {
      const todos = (action as IFetchTodosSucceedAction).todos;
      return {
        ...state,
        loading: false,
        todos,
      }
    }
    case ACTION_TYPES.FETCH_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.ADD_TODO: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.ADD_TODO_SUCCESS: {
      const newTodo = (action as IAddTodoSucceedAction).todo;
      const todos = [newTodo, ...state.todos]
      return {
        ...state,
        loading: false,
        todos
      }
    }
    case ACTION_TYPES.ADD_TODO_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.UPDATE_TODO: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.UPDATE_TODO_SUCCESS: {
      const updatedTodo = (action as IUpdateTodoSucceedAction).todo;
      const todos = state.todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        }
        return todo;
      })
      return {
        ...state,
        loading: false,
        todos,
      }
    }
    case ACTION_TYPES.UPDATE_TODO_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.REMOVE_TODO: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.REMOVE_TODO_SUCCESS: {
      const id = (action as IRemoveTodoSucceedAction).id;
      const todos = state.todos.filter(todo => todo.id !== id);
      return {
        ...state,
        loading: false,
        todos,
      }
    }
    case ACTION_TYPES.REMOVE_TODO_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.REARRANGE_TODOS: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.REARRANGE_TODOS_SUCCESS: {
      const todos = (action as IRearrangeTodosSucceedAction).todos;
      return {
        ...state,
        loading: false,
        todos,
      }
    }
    case ACTION_TYPES.REARRANGE_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.REMOVE_ALL_TODOS: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.REMOVE_ALL_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: [],
      }
    }
    case ACTION_TYPES.REMOVE_ALL_TODOS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    case ACTION_TYPES.UPDATE_ALL_TODOS_STATUS: {
      return {
        ...state,
        loading: true,
      }
    }
    case ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_SUCCESS: {
      const todos = (action as IUpdateAllTodosStatusSucceedAction).todos;
      return {
        ...state,
        loading: false,
        todos,
      }
    }
    case ACTION_TYPES.UPDATE_ALL_TODOS_STATUS_FAIL: {
      return {
        ...state,
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
};

const useTodoReducer = (): [ITodoState, Dispatch<ITodoActions>] => {
  const [state, dispatch]: [ITodoState, Dispatch<ITodoActions>] = useReducer(todoReducer, initialState);
  const enhancedDispatch = applyTodoSideEffectsMiddleWare(dispatch);
  return [state, enhancedDispatch];
};

export default useTodoReducer;
