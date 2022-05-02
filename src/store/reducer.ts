import { Todo, TodoStatus } from '../models/todo';
import {  AppActions} from './actions';
import { SET_TODO, CREATE_TODO, DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_ALL_TODOS, UPDATE_TODO_STATUS } from "./constant"

export interface AppState {
  todos: Array<Todo>
}

const todoList = localStorage.getItem("todos")
export const initialState: AppState = {
  todos: todoList ? JSON.parse(todoList)?.todos : []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
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
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
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