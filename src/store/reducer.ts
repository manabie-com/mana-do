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

function middleReducer(callback:()=> void,state:AppState){
  callback();
  setToLocalStorage(state.todos);
}

function reducer(state: AppState, action: AppActions): AppState {
  const newState:AppState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_TODO:
      middleReducer(()=>{
        newState.todos = action.payload
      },newState)

      break;

    case CREATE_TODO:
      middleReducer(()=>{
        newState.todos.push(action.payload.data);
        action.payload.callback()
      },newState)

      break;

    case EDIT_TODO:
      middleReducer(()=>{
        const index3 = newState.todos.findIndex((todo) => todo.id === action.payload.todoId);
        if(index3 !== -1) newState.todos[index3].content = action.payload.content
      },newState)

      break;

    case UPDATE_TODO_STATUS:
      middleReducer(()=>{
        const index2 = newState.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if(index2 !== -1) newState.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      action.payload.callback()
      },newState)
     
      break;

    case TOGGLE_ALL_TODOS:
      middleReducer(()=>{
        newState.todos = newState.todos.map((e)=>{
          return {
            ...e,
            status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
          }
        })
        action.payload.callback()
      },newState)

      break;

    case DELETE_TODO:
      middleReducer(()=>{
        const index1 = newState.todos.findIndex((todo) => todo.id === action.payload);
        if(index1 !== -1) newState.todos.splice(index1, 1);
      },newState)

      break;

    case DELETE_ALL_TODOS:
      middleReducer(()=>{
        newState.todos= []
      },newState)

      break;

    case FILTER_TODOS:
      middleReducer(()=>{
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
      },newState)

      break;

    default:
      break;
  }

  return newState;
}

export default reducer;