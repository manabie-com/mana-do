import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO,
  FILTER_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      const dataList = JSON.parse(localStorage.getItem('dataList') as string) as Array<Todo> || [];
      localStorage.setItem('dataList', JSON.stringify([...dataList, action.payload]))
      return {
        ...state
       
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem('dataList', JSON.stringify(state.todos))

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      localStorage.setItem('dataList', JSON.stringify(tempTodos))

      return {
        ...state,
        todos: tempTodos
      }

    case SET_TODO:

      return {
        ...state,
        todos: action.payload
      }
    case FILTER_TODO:
      const dataListFilter = JSON.parse(localStorage.getItem('dataList') as string) as Array<Todo> || [];
      let newListFilter = dataListFilter
      newListFilter = action.payload.statusFilter === 'ALL' ? (dataListFilter || []) : (dataListFilter.filter((todo: any) => todo.status === action.payload.statusFilter) || [])

      return {
        ...state,
        todos: newListFilter
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      localStorage.setItem('dataList', JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      localStorage.setItem('dataList', JSON.stringify([]))
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO:
      const index4 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index4].content = action.payload.content;
      localStorage.setItem('dataList', JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    default:
      return state;
  }
}

export default reducer;