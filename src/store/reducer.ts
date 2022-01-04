import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  SET_TODO,
  UPDATE_TODO_STATUS,
  EDIT_TODO
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
      const todos1: Array<Todo> = action.payload
      return {
        ...state,
        todos: todos1
      }

    case CREATE_TODO:

      // when case create new todo active : the reducer call 2 twice that reason i change method from push to spread operator make sure no duplicate value
      // state.todos.push(action.payload)
      const todos2: Array<Todo> = [...state.todos, action.payload]
      localStorage.setItem("todos", JSON.stringify(todos2))
      return {
        ...state,
        todos: todos2
      };

    case EDIT_TODO:
      const currentIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[currentIndex].content = action.payload.content
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }

    case UPDATE_TODO_STATUS:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index1].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(state.todos))
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

      localStorage.setItem("todos", JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      // when case  delete todo active : the reducer call 2 twice. when it find index value then splice position value, but the case call again it don't find index in array and it return -1 , array splice(-1 ,1) it remove last item from array ,i resolve bug problem add condition (index >= 0) purpose to avoid remove last item from array

      const index2 = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index2 >= 0) {
        state.todos.splice(index2, 1);
      }
      localStorage.setItem("todos", JSON.stringify(state.todos))

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem("todos", JSON.stringify([]))
      return {
        ...state,
        todos: []
      }

    default:
      return state;
  }
}

export default reducer;