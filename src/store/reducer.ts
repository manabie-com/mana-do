import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
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
    // ADDED: Set todos
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      };
    case CREATE_TODO:
      // FIXED: We should not mutate the old array. Instead, create a new one to keep the state immutable, avoid bugs
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };

    case UPDATE_TODO_STATUS:
      // FIXED: should not mutate the old array
      const newTodos = [...state.todos];
      const index2 = newTodos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodos[index2].status = action.payload.status;

      return {
        ...state,
        todos: newTodos
      }

    case UPDATE_TODO_CONTENT:
      const todos = [...state.todos];
      const index = todos.findIndex((todo) => todo.id === action.payload.todoId);
      todos[index].content = action.payload.content;

      return {
        ...state,
        todos: todos
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
      // FIXED: should not mutate the old array. Use filter instead.
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload)
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
