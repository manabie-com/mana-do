import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
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
    case SET_TODO:
      return { ...state, todos: [...action.payload] }
    case CREATE_TODO:
      //reducer run twice to apparent side effect s
      //since reducer pure, calling it twice doesn't affect the logic
      return { ...state, todos: [...state.todos, action.payload] }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo: any) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e: any) => {
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
      //reducer run twice to apparent side effect s
      //since reducer pure or we use mutable object, calling it twice doesn't affect the logic
      let remainArray = [...state.todos].filter((todo) => {
        if (todo.id !== action.payload) {return todo}
      });
      return {
        ...state,
        todos: [...remainArray]
      }
    case DELETE_ALL_TODOS:
      return { ...state, todos: [] }

    default:
      return state;
    case EDIT_TODO:
      const editIndex = state.todos.findIndex((todo: any) => todo.id === action.payload.id);
      const array = [...state.todos]
      array[editIndex].content = action.payload.newContent
      return { ...state, todos: array }

  }
}

export default reducer;