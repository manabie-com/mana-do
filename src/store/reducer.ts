import {Todo, TodoStatus} from '../models/todo';
import { Auth } from '../models/auth';
import {
  ACT_LOGIN,
  ACT_SIGN_OUT,
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';


//IAuth for authentication
export interface AppState {
  todos: Array<Todo>,
  auth: Auth,
}

export const initialState: AppState = {
  todos: [],
  auth: {},
}

function reducer(state: AppState, action: AppActions): AppState {
  

  
  switch (action.type) {
    case ACT_LOGIN: 
    return {
      ...state,
      auth: action.payload
    }

    //THIENNGUYEN: Sign out action to reset store
    case ACT_SIGN_OUT:
    return {
      ...initialState,
    }
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
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
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case SET_TODO: 
      return {
        ...state,
        todos: action.payload
      }
    default:
      return state;
  }
}

export default reducer;