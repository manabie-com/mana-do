import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
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
      const tempTodos1 = [...state.todos, action.payload];
      return {
        ...state,
        todos: tempTodos1,
      };

    case UPDATE_TODO_STATUS:
      const tempTodos2 = state.todos.map((todo) => {
        if(todo.id === action.payload.todoId) {
          return {
            ...todo,
            status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
          }
        }
        return todo;
      })
      return {
        ...state,
        todos: tempTodos2
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos3 = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos3
      }

    case DELETE_TODO:
      const remainingTodos = [...state.todos].filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: remainingTodos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;
