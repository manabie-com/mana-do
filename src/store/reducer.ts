import {Todo} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
    case SET_TODO:
      return {
        todos: action.payload
      };

    case CREATE_TODO:
      return {
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO:
      let newTodos1 = [...state.todos]
      const index = newTodos1.findIndex((todo) => todo.id === action.payload.todoID);
      index > -1 && newTodos1.splice(index, 1 , {...newTodos1[index], ...action.payload.todo})
      return {
        ...state,
        todos: newTodos1
      }
    case DELETE_TODO:
      let newTodos2 = [...state.todos]
      const index1 = newTodos2.findIndex((todo) => todo.id === action.payload);
      index1 > -1 &&  newTodos2.splice(index1, 1);
      return {
        ...state,
        todos: newTodos2
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