import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO
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
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };

    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }

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
      const result = state.todos.filter(todo => todo.id !== action.payload)
      localStorage.setItem('todoList', JSON.stringify(result))

      return {
        ...state,
        todos: result
      }
    case DELETE_ALL_TODOS:
      const todoEmpty:Todo[] = []
      localStorage.setItem('todoList', JSON.stringify(todoEmpty))
      return {
        ...state,
        todos: todoEmpty
      }
    default:
      return state;
  }
}

export default reducer;