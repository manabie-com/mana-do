import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  SET_AUTH, UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>,
  auth: Boolean
}

export const initialState: AppState = {
  todos: [],
  auth: false
}

const reducer = (state: AppState, action: AppActions): AppState =>{
  switch (action.type) {
    case CREATE_TODO:
      const newTodo = [...state.todos, action.payload];
      localStorage.setItem('TODO', JSON.stringify(newTodo));
      return {
        ...state,
        todos: newTodo
      };

    case UPDATE_TODO_STATUS:
      let todoUpdatedStatusCopy = [...state.todos];
      const indexTodoUpdateStatus = todoUpdatedStatusCopy.findIndex((todo) => todo.id === action.payload.todoId);
      todoUpdatedStatusCopy[indexTodoUpdateStatus].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('TODO', JSON.stringify(todoUpdatedStatusCopy));
      return {
        ...state,
        todos: todoUpdatedStatusCopy
      }

    case TOGGLE_ALL_TODOS:
      const todosToggleCopy = [...state.todos];
      const tempTodos = todosToggleCopy.map((e)=>{
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
      let todoDeleteCopy = [...state.todos]
      const indexTodoDelete = todoDeleteCopy.findIndex((todo) => todo.id === action.payload);
      todoDeleteCopy.splice(indexTodoDelete, 1);
      localStorage.setItem('TODO', JSON.stringify(todoDeleteCopy));
      return {
        ...state,
        todos: todoDeleteCopy
      }

    case DELETE_ALL_TODOS:
      localStorage.setItem('TODO', JSON.stringify([]));
      return {
        ...state,
        todos: []
      }

    case SET_TODO:
      const todoSetCopy = [...action.payload]
      localStorage.setItem('TODO', JSON.stringify(todoSetCopy));
      return {
        ...state,
        todos : todoSetCopy
      };

    case SET_AUTH:
      return {
        ...state,
        auth : action.payload
      };

    case UPDATE_TODO:
      let todosUpdatedCopy = [...state.todos];
      const indexTodoUpdate = todosUpdatedCopy.findIndex((todo) => todo.id === action.payload.todoId);
      todosUpdatedCopy[indexTodoUpdate].content = action.payload.value;
      localStorage.setItem('TODO', JSON.stringify(todosUpdatedCopy));
      return {
        ...state,
        todos: todosUpdatedCopy
      };

    default:
      return state;
  }
}

export default reducer;

