import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_EDITING,
} from './actions';


export interface AppState {
  todos: Array<Todo>
}

/*
* Revised intial state declaration to incorporate stored todos state in the local storage
*/

const storedTodos = localStorage.getItem('todos');

export const initialState: AppState = {
  todos: storedTodos? JSON.parse(storedTodos) : []
}

/*
* Revised reducer since creating and deleting list items mutated the state.
* Also revised most reducer action cases to properly update the todos state and initiate component updates.
*/
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: 
      const newList1 = [...state.todos];
      newList1.push(action.payload);
      return {
        ...state,
        todos: newList1,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newList2 = [...state.todos]
      newList2[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newList2,
      }

    case UPDATE_TODO_CONTENT:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newList3 = [...state.todos]
      newList3[index3].content = action.payload.content;

      return {
        ...state,
        todos: newList3,
      }

    case UPDATE_TODO_EDITING:
      const index4 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newList4 = [...state.todos]
      newList4[index4].isBeingEdited = action.payload.isBeingEdited;

      return {
        ...state,
        todos: newList4,
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
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
      const filteredList = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        todos: filteredList,
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