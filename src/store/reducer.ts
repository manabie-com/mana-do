import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
      // anti-pattern mutable if using push
      let { todos } = state;
      todos = state.todos.concat(action.payload);
      return {
        todos,
      };

    case UPDATE_TODO_STATUS:
      // anti-pattern mutable
      const tempTodos2 = state.todos.map((e)=> {
        if (e.id !== action.payload.todoId) {
          return e;
        }
        return {
          ...e,
          status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        todos: tempTodos2
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        todos: tempTodos
      }

    case DELETE_TODO:
      // anti-pattern mutable if using slice
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      return {
        todos: []
      }

    default:
      return state;
  }
}

export default reducer;
