import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from './actions';

export interface AppState {
  todos: Array<Todo> 
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem('todos') || '') || []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    
    case UPDATE_TODO_CONTENT:
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId)
      state.todos[todoIndex].content = action.payload.content
      localStorage.setItem('todos', JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    case CREATE_TODO:
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos))
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
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
      localStorage.setItem('todos', JSON.stringify(state.todos))

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      localStorage.setItem('todos', JSON.stringify(state.todos))

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem('todos', JSON.stringify(state.todos))
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;