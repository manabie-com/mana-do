import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
    case CREATE_TODO:
      // store's state is immutable data,
      // and reducer is pure function,
      // so we shouldn't change the todos in the state directly
      // if we don't want any unexpected side effects
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS:
      let todoList = [...state.todos]
      const index2 = todoList.findIndex((todo) => todo.id === action.payload.todoId);
      todoList[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      return {
        ...state,
        todos: todoList
      };
    case UPDATE_TODO:
      let todos = [...state.todos];
      const indexUpdate = todos.findIndex(obj => obj.id === action.payload.id);
      todos[indexUpdate] = action.payload;
      return {
        ...state,
        todos
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

      return {
        ...state,
        todos: {...state}.todos.splice(index1, 1)
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