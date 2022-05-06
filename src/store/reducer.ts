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
      /*The problem
        Directly modify app state is anti-pattern. Redux expects that all state updates are done immutably.
        The solution
        Make a shallow copy of `todos` property, then modify it.

        Ref: https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability
      */
     
      const todos = [...state.todos, action.payload]
      return {
        ...state,
        todos,
      }

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      )
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE

      return {
        ...state,
        todos: state.todos,
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        }
      })

      return {
        ...state,
        todos: tempTodos,
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload)
      state.todos.splice(index1, 1)

      return {
        ...state,
        todos: state.todos,
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      }
    default:
      return state
  }
}

export default reducer;