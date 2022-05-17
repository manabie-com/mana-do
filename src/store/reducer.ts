import {Todo, TodoStatus} from '../models/todo';
import { LocalStore } from '../utils/local-store';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from './actions';

/**
 * Most of the bugs and errors occurs because the old logic mutated the previous state. 
 * Therefore, the React.strictmode make the component 
 * invoke the reducer one extra time and there are two todos created or deleted at once.
 * Updating todo status also went wrong because of this.
 * 
 * Solution: utilizing spread operator to copy the state object, to remain object immutability.
 * 
 * Fixed action type cases: CREATE_TODO, UPDATE_TODO_STATUS, DELETE_TODO
 */

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}
/**
 * 
 * @param {AppState} state 
 * @param {AppActions} action 
 * @returns {AppState}
 */
function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return LocalStore.getCachedState().todos.length > 0 ? LocalStore.getCachedState(): state;
    case CREATE_TODO:
      if (action.payload.content.length === 0) {
        return state;
      }
      
      // Creating a new state, with new todo appended (action.payload)
      const stateAfterCreatingOne = {...state, todos: [...state.todos, action.payload]};
      LocalStore.setCachedState(stateAfterCreatingOne)
      return stateAfterCreatingOne;

    case UPDATE_TODO_STATUS:
      // Find the index of the todo
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      // Creating a new Todo with status updated
      const todo = { ...state.todos[index1], status: action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE };

      // Creating a new state, with the entire todo replaced.
      const stateAfterCheckingAll = {
        ...state,
        todos: [
          ...state.todos.slice(0, index1),
          todo,
          ...state.todos.slice(index1 + 1)
        ]
      }
      
      LocalStore.setCachedState(stateAfterCheckingAll);
      return stateAfterCheckingAll;

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      const stateAfterTogglingAll ={
        ...state,
        todos: tempTodos
      }
      LocalStore.setCachedState(stateAfterTogglingAll);
      return stateAfterTogglingAll;
    case DELETE_TODO:
      // Find the index of the todo
      const index2: number = state.todos.findIndex((todo) => todo.id === action.payload);

      const stateAfterDeletingOne = {
        ...state,
        todos: [
          ...state.todos.slice(0, index2),
          ...state.todos.slice(index2 + 1)
        ]
      };
      
      LocalStore.setCachedState(stateAfterDeletingOne);
      return stateAfterDeletingOne;
    case DELETE_ALL_TODOS:
      const stateAfterDeletingAll = {
        ...state,
        todos: []
      };
      LocalStore.setCachedState(stateAfterDeletingAll);
      return stateAfterDeletingAll;
  }
}

export default reducer;