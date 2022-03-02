import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO, FILTER_TODO_STATUS, TOGGLE_ALL_TODOS, UPDATE_TODO, UPDATE_TODO_STATUS
} from './actions';


export interface AppState {
  todos: Array<Todo>,
  filter: string
}

export const initialState: AppState = {
  todos: [],
  filter: "ALL"
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:      
      // After dispatch, components will renders again with new state from reducer 
      // If we mutation state todos here, the view will update twice 
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);      
      
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      
      return {
        ...state,
        todos: [...state.todos]
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
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }
    
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    
    case FILTER_TODO_STATUS: 
      return {
        ...state,
        filter: action.payload
      }
    
    case UPDATE_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);      
      
      state.todos[index3].content = action.payload.content;
      
      return {
        ...state,
        todos: [...state.todos]
      }
    default:
      return state;
  }
}

export default reducer;