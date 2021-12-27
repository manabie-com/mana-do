import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
} from './actions';
import { CREATE_TODO, DELETE_TODO, DELETE_ALL_TODOS, TOGGLE_ALL_TODOS, UPDATE_TODO_STATUS, UPDATE_TODO_CONTENT } from '../constants/redux-action.state'

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("todos") as any) || []
}

function reducer(state: AppState, action: AppActions): AppState {  
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(state.todos))
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
      localStorage.setItem("todos", JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      state.todos=[];
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }
    case UPDATE_TODO_CONTENT:
      state.todos.forEach((todo, index, array) => {
        if(todo.id === action.payload.todoId) {
          array[index].content = action.payload.todoContent
        }
      })
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return {
        ...state,
        todos: state.todos
      }
    default:
      return state;
  }
}

export default reducer;