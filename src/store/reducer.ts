import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM
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
        ...state,
        todos: action.payload
      }
    case CREATE_TODO:
      const todos: Array<Todo> = [
        ...state.todos,
        action.payload
      ]
      localStorage.setItem('todos', JSON.stringify(todos))

      return {
        ...state,
        todos
      };

    case UPDATE_TODO_STATUS:
      const existedItem = state.todos.findIndex((todo) => todo.id === action.payload.todoId)
      state.todos[existedItem].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todos', JSON.stringify(state.todos))

      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_ITEM:
      const findItem = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[findItem].content = action.payload.content
      localStorage.setItem('todos', JSON.stringify(state.todos))

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
      localStorage.setItem('todos', JSON.stringify(tempTodos))

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const items = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(items))

      return {
        ...state,
        todos: items
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem('todos', JSON.stringify([]))
      
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;