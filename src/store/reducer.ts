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
    //
    case SET_TODO:
      return {
        ...state,
        todos: action.payload
      }

    case CREATE_TODO:
      // ISSUE: After the first ToDo added, the next todo-es will be added twice.
      // Solution: using spread operator instead of pushing new data to original state.
      return {
        ...state,
        todos: [
            ...state.todos,
            action.payload
        ]
      }

    case EDIT_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      return {
        ...state,
        todos:
        state.todos.map((todo,index) => {
          if(index === index3) {
            return {
              ...todo,
              content: action.payload.content
            }
          }
          return todo
        })
      }

    case UPDATE_TODO_STATUS:
      // using map to return new value and keep existing values for other items.
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      return {
        ...state,
        todos:
        state.todos.map((todo,index) => {
          if (index === index2) {
            return {
              ...todo,
              status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            }
          }
          return todo
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
      //
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      const todos1 = state.todos.slice()
      todos1.splice(index1, 1);

      return {
        ...state,
        todos: todos1
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
