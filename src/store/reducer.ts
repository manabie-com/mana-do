import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function  reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

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
      state.todos.splice(index1, 1);

      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    
    //SET_TODO use for setTodo, which i use for get data from localStorage
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }
    
    //UPDATE_TODO_CONTENT use for update todo content by todo.id
    case UPDATE_TODO_CONTENT:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index3].content = action.payload.content;

      return {
        ...state,
        todos: state.todos
      }
    default:
      return state;
  }
}

export default reducer;