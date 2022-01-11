import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  EDIT_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string)  : [];

export const initialState: AppState = {
  todos: todos,
}

function reducer(state: AppState = initialState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      // In the usual Immutability way, every time we change a certain property, 
      // we have to clone the entire Object or Array into a copy, and then perform the modification on the copy itself.
      // Changing data on the original itself will create a side effect that leads to many unwanted bugs.

      const newTodos = [...state.todos];
      newTodos.push(action.payload)

      return {
        ...state,
        todos: newTodos
      };
    }
    case UPDATE_TODO_STATUS:
      const newTodos = [...state.todos];
      const index2 = newTodos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newTodos
      }

    case EDIT_TODO: {
      const newTodos = [...state.todos];
      const index2 = newTodos.findIndex((todo) => todo.id === action.payload.id);
      newTodos[index2].content = action.payload.content

      return {
        ...state,
        todos: newTodos
      };
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

    case DELETE_TODO: {
      const newTodos = [...state.todos]
      const index1 = newTodos.findIndex((todo) => todo.id === action.payload);
      newTodos.splice(index1, 1)

      return {
        ...state,
        todos: newTodos
      }
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