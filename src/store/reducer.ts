import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO
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
      const todos = [...state.todos, action.payload];
      return {
        ...state,
        todos
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index2),
          Object.assign({}, state.todos[index2], {status: status}),
          ...state.todos.slice(index2+1)
        ]
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const list = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        todos: list
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO:
      const index = state.todos.findIndex(todo => {
        return todo.id === action.payload.todoId
      });
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index),
          Object.assign({}, state.todos[index], {content: action.payload.content}),
          ...state.todos.slice(index+1)
        ]
      };
      case SET_TODO:
        return {
          todos: action.payload
        }
    default:
      return state;
  }
}

export default reducer;