import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';
import { setToLocalStorage } from '../middleware/localStorage';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  const newState:AppState = JSON.parse(JSON.stringify(state));
  
  switch (action.type) {
    case CREATE_TODO:
      newState.todos.push(action.payload);

      setToLocalStorage(newState.todos)
      break;

    case UPDATE_TODO_STATUS:
      const index2 = newState.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if(index2 !== -1) newState.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      setToLocalStorage(newState.todos)
      break;

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
      const index1 = newState.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      setToLocalStorage(newState.todos)
      break;

    case DELETE_ALL_TODOS:
      newState.todos= []

      setToLocalStorage(newState.todos)
      break;

    default:
      break;
  }

  return {
    ...newState
  };
}

export default reducer;