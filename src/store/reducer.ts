import { EnhanceTodoStatus } from '../context';
import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_SHOWING,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>;
  showing:EnhanceTodoStatus;
}

export const initialState: AppState = {
  todos: localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")!) : [],
  showing: "ALL"
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem("todos", JSON.stringify(state.todos));

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
      localStorage.setItem("todos", JSON.stringify(tempTodos));

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);
      localStorage.setItem("todos", JSON.stringify(state.todos));

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.setItem("todos", JSON.stringify([]));
      return {
        ...state,
        todos: []
      }

    case SET_SHOWING:
      return {...state, showing:action.payload}
    default:
      return state;

    case EDIT_TODO:
      let td =state.todos.find(todo => todo.id === action.payload.id);
      if(td){
        td.content = action.payload.content;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos));

      return {...state}
  }
}

export default reducer;