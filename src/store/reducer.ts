import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
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
      const newTodo = state.todos.slice(0);
      newTodo.push(action.payload);
      return {
        ...state, todos: newTodo
      }

    case UPDATE_TODO_STATUS:
      const { todoId, checked } = action.payload;
      const todoPosition = state.todos.findIndex((todo) => todo.id === todoId);

      if(todoPosition !== -1) {
        state.todos[todoPosition].status = checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      }

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
    case SET_TODO: 
      return {
        ...state,
        todos: action.payload
      }
    case EDIT_TODO: {
      const { id, newContent } = action.payload;
      const tempTodos = state.todos.slice(0);
      const todoEditPosition = state.todos.findIndex((todo) => todo.id === id);

      if (todoEditPosition !== -1) {
        tempTodos[todoEditPosition].content = newContent;
      }
      return {
        ...state, todos: tempTodos
      }
    }
    default:
      return state;
  }
}

export default reducer;