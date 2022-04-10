import {AppState, Todo, TodoStatus} from 'models/todo';
import {
  AppActions,
} from './actions';
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  FILTER_TODOS,
} from './constants';

export const initialState: AppState = {
  todos: [],
  filter: '',
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case UPDATE_TODO_STATUS:
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          let status = todo.status;
          if (todo.id === action.payload.todoId) {
            status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
          }
          return {
            ...todo,
            status,
          }
        })
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
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    case FILTER_TODOS:
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state;
  }
}

export default reducer;
