import { TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO_STATUS_CONTENT
} from './actions';
import {AppState} from './initState';

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // state.todos.push(action.payload);
      return {
        ...state,
        todos : [...state.todos, action.payload] 
        /* Instead of mutating your initialState with .push, 
        "copy" your last state into meaningful new state */
      }
      
    case SET_TODO: // missing case set todo
      return {
        ...state,
        todos :action.payload 
      }
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos
      }
    case UPDATE_TODO_STATUS_CONTENT:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index3].content = action.payload.content
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

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
       /**
       * state.todos.splice(index1, 1);
       * => Even though you're returning a new object,
       * you're still polluting the old object,
       * A better way would be as follows:
       */
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, index1),
          ...state.todos.slice(index1 + 1)
      ]
        // todos:  state.todos
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