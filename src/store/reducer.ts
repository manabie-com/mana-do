import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  UPDATE_TODO,
  EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>,
  editTodoId: string
}

export const initialState: AppState = {
  // todos: [],
  todos: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : [],
  editTodoId: ''
}

function reducer(state: AppState, action: AppActions): AppState {
  let todos = JSON.parse(JSON.stringify(state.todos));
  switch (action.type) {
    case CREATE_TODO:
      if (action.payload.content !== '') {
        todos.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      return {
        ...state,
        todos: todos
      };

    case EDIT_TODO:
      return {
        ...state,
        editTodoId: action.payload
      }

    case UPDATE_TODO:
      if (action.content !== '') {
        const index3 = state.todos.findIndex((todo) => todo.id === action.payload);
        state.todos[index3].content = action.content
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
      return {
        ...state,
        todos: state.todos,
        editTodoId: ''
      }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(state.todos));

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
      localStorage.setItem("todos", JSON.stringify(tempTodos));

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = todos.findIndex((todo: Todo) => todo.id === action.payload);
      todos.splice(index1, 1);
      localStorage.setItem("todos", JSON.stringify(todos));

      return {
        ...state,
        todos: todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem("todos", JSON.stringify([]));

      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;