import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_ERROR,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO_CONTENT
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  // create temp variable make code more clean
  let tempTodos: Todo[];

  switch (action.type) {
    case SET_TODO:
      // Initial with todos, should clone array prevent variable mutate
      tempTodos = [...action.payload];

      break;

    case CREATE_TODO:
      // Prototype push is a mutative method and it cause todo add twice a time
      // Should append new element by using non mutative method like spread or concat. I prefer spread method
      tempTodos = [...state.todos, action.payload];

      break;

    case UPDATE_TODO_STATUS:
      // I prefer using map to return new data in this case
      tempTodos = state.todos.map(todo => {
        return {
          ...todo,
          status: todo.id !== action.payload.todoId ? todo.status : (action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE)
        }
      });

      break;

    case UPDATE_TODO_CONTENT:
      // As update todo stats, I prefer using map to return new data in this case
      tempTodos = state.todos.map(todo => {
        return {
          ...todo,
          content: todo.id !== action.payload.todoId ? todo.content : action.payload.newContent
        }
      });

      break;

    case TOGGLE_ALL_TODOS:
      // change e to todo more clear
      tempTodos = state.todos.map((todo) => {
        return {
          ...todo,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      break;

    case DELETE_TODO:
      // Prototype splice is a mutative method and it cause bugs
      // Should make sure using non-mutative method to remove todo but I prefer using filter and clone them
      tempTodos = [...state.todos.filter(todo => todo.id !== action.payload)];
      
      break;

    case DELETE_ALL_TODOS:
      tempTodos = [];
      
      break;

    case SET_ERROR:
      throw new Error("Unsuccessful action");
      
    default:
      tempTodos = [];
      break
  }

  return {
    ...state,
    todos: tempTodos
  }
}

export default reducer;