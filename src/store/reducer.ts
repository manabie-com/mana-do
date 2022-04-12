import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
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
      // state.todos.push(action.payload); //Wrong way to create todo
      return {
        ...state,
        todos: [...state.todos, action.payload] //Right way to create todo
      };

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map(todo =>
        (todo.id === action.payload.todoId) 
          ? {...todo, status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE}
          : todo
      )}

    case UPDATE_TODO_CONTENT:
      return {
        ...state,
        todos: state.todos.map(todo =>
        (todo.id === action.payload.todoId) 
          ? {...todo, content: action.payload.content}
          : todo
      )}

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
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.todoId
        })
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