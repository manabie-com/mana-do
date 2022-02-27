import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_ALL_TODO_COMPLETED
} from './actions';

export interface AppState {
  todos: Array<Todo>
  isDone: boolean
}

export const initialState: AppState = {
  todos: [],
  isDone: false
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      // After useReducer dispatched, React components will render again with the "new state" from useReducer
      // If we mutate the state.todos here, useReducer is going udpate the view with the mutated state.todos
      // So in this case, we see todo item added twice and cause bugs
      const todos = [...state.todos, action.payload]

      return {
        ...state,
        todos: todos
      };
    }

    case UPDATE_TODO_STATUS: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const todos = [...state.todos];
      todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: todos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const todos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: todos
      }
    }

    case SET_ALL_TODO_COMPLETED: {
      const index = state.todos.findIndex((todo) => todo.status === TodoStatus.ACTIVE);
      const isDone = index === -1;

      return {
        ...state,
        isDone: isDone
      }
    }

    case DELETE_TODO: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      const todos = [...state.todos];
      todos.splice(index, 1);

      return {
        ...state,
        todos: todos
      }
    }

    case DELETE_ALL_TODOS: {
      return {
        ...state,
        todos: []
      }
    }

    default:
      return state;
  }
}

export default reducer;
