import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  EDIT_TODO,
  SHOW_ALL_LIST_TODO
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
      state.todos.push(action.payload);
      localStorage.setItem(
        `LocalSettings:todolist:format`,
        JSON.stringify(state.todos)
      )
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem(
        `LocalSettings:todolist:format`,
        JSON.stringify(state.todos)
      )
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
      localStorage.setItem(
        `LocalSettings:todolist:format`,
        JSON.stringify(tempTodos)
      )
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      let item = state.todos.filter(v => v.id !== action.payload)
      localStorage.setItem(
        `LocalSettings:todolist:format`,
        JSON.stringify(item)
      )
      return {
        ...state,
        todos: item
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case EDIT_TODO:
      if (action.payload.display) {
        state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            todo.content = action.payload.value
          }
          return todo
        })
      }
      localStorage.setItem(
        `LocalSettings:todolist:format`,
        JSON.stringify(state.todos)
      )
      return {
        ...state,
        todos: state.todos
      };

    case SHOW_ALL_LIST_TODO:
      state.todos = action.payload.listTodo
      return {
        ...state,
        todos: state.todos
      }

    default:
      return state;
  }
}

export default reducer;