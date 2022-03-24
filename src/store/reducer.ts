import { getFromLocalStorage } from './../middleware/localStorage';
import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  EDIT_TODO,
  FILTER_TODOS
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
    case SET_TODO:
      newState.todos = action.payload

      setToLocalStorage(newState.todos)
      break;

    case CREATE_TODO:
      newState.todos.push(action.payload);

      setToLocalStorage(newState.todos)
      break;

    case EDIT_TODO:
      const index3 = newState.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if(index3 !== -1) newState.todos[index3].content = action.payload.content

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
      if(index1 !== -1) newState.todos.splice(index1, 1);

      setToLocalStorage(newState.todos)
      break;

    case DELETE_ALL_TODOS:
      newState.todos= []

      setToLocalStorage(newState.todos)
      break;

    case FILTER_TODOS:
      if(action.payload.filterName === 'ALL') {
        newState.todos.forEach(todo => {
          todo.filter = true
        })
      }
      else{
        newState.todos.forEach(todo => {
          if(todo.status === action.payload.filterName) todo.filter = true
          else todo.filter = false
        })
      }

      setToLocalStorage(newState.todos)
      break;

    default:
      break;
  }

  return newState;
}

export default reducer;