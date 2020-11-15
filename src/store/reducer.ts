import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO
} from './actions';
import {setLocalStorage} from "../utils/localStored";

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      setLocalStorage("todoList", [...action.payload]);
      return {
        ...state,
        todos: action.payload
      };

    case CREATE_TODO:
      //Saving todos item on local storage
      setLocalStorage("todoList", [...state.todos, action.payload]);
      // StrictMode renders components twice so this should be pure function without any side effects
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS:
      const updatedTodoStatus = state.todos.map((todo) => {
        if(todo.id === action.payload.todoId){
          todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        }
        return todo;
      })
      setLocalStorage("todoList", updatedTodoStatus);

      return {
        ...state,
        todos: updatedTodoStatus
      }

    case UPDATE_TODO:
      const updatedTodoList = state.todos.map((todo) => {
        if(todo.id === action.payload.id){
          todo.content = action.payload.content;
        }
        return todo;
      });
      setLocalStorage("todoList", updatedTodoList);
      return {
        ...state,
        todos: updatedTodoList
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      setLocalStorage("todoList", tempTodos);

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      // Using filter() to get all todos remain
      const todosRemainder = state.todos.filter((todo) => todo.id !== action.payload);
      setLocalStorage("todoList", todosRemainder);
      return {
        ...state,
        todos: todosRemainder
      }
    case DELETE_ALL_TODOS:
      setLocalStorage("todoList", []);
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;
