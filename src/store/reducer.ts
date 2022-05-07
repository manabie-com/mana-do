import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
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
        Directly modify app state is anti-pattern. React expects that all state updates are done immutably.
        The solution
        Make a shallow copy of `todos` property, then modify it.

        Ref: https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly 
      */
     
      const todos = [...state.todos, action.payload]
      return {
        ...state,
        todos,
      }

    case UPDATE_TODO_STATUS:
      // This action is the same as the problem and the solution of the CREATE_TODO action.
      const updateStatusTodos = [...state.todos];
      const index = updateStatusTodos.findIndex(todo => todo.id === action.payload.todoId);
      const checkStatus = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      updateStatusTodos[index].status = checkStatus;
      return {
        ...state,
        todos: updateStatusTodos,
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
      const copyTodos = [...state.todos];
      const deleteIndex = copyTodos.findIndex((todo) => todo.id === action.payload);
      if (deleteIndex > -1) {
        copyTodos.splice(deleteIndex, 1);
      }

      return {
        ...state,
        todos: copyTodos,
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      }
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      }
    case UPDATE_TODO_CONTENT:
      const updateTodos = [...state.todos];
      const todoIndex = updateTodos.findIndex(todo => todo.id === action.payload.todoId);
      updateTodos[todoIndex].content = action.payload.newContent;
      return {
        ...state,
        todos: updateTodos,
      }
    default:
      return state
  }
}

export default reducer;