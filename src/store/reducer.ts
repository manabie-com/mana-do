import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      };
    }
    case CREATE_TODO: //error: duplicate todo when create todo because push new data to array 2 times 
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case UPDATE_TODO:
      const currentIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[currentIndex].content = action.payload.newValue;
      return {
        ...state,
        todos: [...state.todos]
      };
    case UPDATE_TODO_STATUS: //error:can't change status because passed indexTodo. solution: pass ID of todo
      const current = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[current].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [...state.todos]
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
      const newState = state.todos.filter((todo) => todo.id !== action.payload);
      console.log(newState);
      

      return {
        ...state,
        todos: newState
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