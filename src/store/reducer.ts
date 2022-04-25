import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]")
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        //Return existing data first
        ...state,
        //Then return new array for the todos object
        todos: [
          //Spread old todos
          ...state.todos, 
          //and new todo
          action.payload
        ]
      };

    case UPDATE_TODO_STATUS:
      return {
        //Find the specific todo item and update the status
        todos: state.todos.map(todo =>
          (todo.id === action.payload.todoId) 
            ? {...todo, status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE}
            : todo
      )}


    case UPDATE_TODO_CONTENT:
      return {
        //Find changed todo item and update its text/content
        todos: state.todos.map(todo =>
          (todo.id === action.payload.todoId) 
            ? {...todo, content: action.payload.text}
            : todo
      )}

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
      return {
        //Get specific todo and filter existing todos to remove a specific item
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
      
    case DELETE_ALL_TODOS:
      return {
        //Return an empty object to delete all todos
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;