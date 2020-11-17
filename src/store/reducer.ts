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

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // state.todos.push(...) would mutate the old state
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case UPDATE_TODO_STATUS: {
      // copy todos and manipulate the copy to keep the state immutable
      const todos = [...state.todos]
      const index = todos.findIndex((todo) => todo.id === action.payload.todoId);
      todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [...todos]
      }
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

    case DELETE_TODO: {
      // copy todos and manipulate the copy to keep the state immutable
      const todos = [...state.todos]
      const index = todos.findIndex((todo) => todo.id === action.payload);
      todos.splice(index, 1);

      return {
        ...state,
        todos: [...todos]
      }
    }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case UPDATE_TODO: {
      console.log(action)
      const todos = [...state.todos]
      const index = todos.findIndex((todo) => todo.id === action.payload.todoId)
      todos[index].content = action.payload.value

      return {
        ...state,
        todos: [...todos]
      }
    }
    default:
      return state;
  }
}

export default reducer;
