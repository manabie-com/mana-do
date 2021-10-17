import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
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
    case SET_TODO:
      return {
        ...state,
        todos: action.payload,
      };
    case CREATE_TODO:
      /*
        state.todos.push(action.payload);
        return {
          ...state,
        };

        ==> The code above is wrong
        ==> Because Reducer is a pure function so we should not mutate the state directly
      */

      // => Fix by using spread operator to clone the new state based on the old one then return new state
      const todosTemp = [...state.todos];
      todosTemp.push(action.payload);

      return {
        ...state,
        todos: todosTemp,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      /*
        const index1 = state.todos.findIndex(
          (todo) => todo.id === action.payload
        );
        state.todos.splice(index1, 1);

        return {
          ...state,
          todos: state.todos,
        };

        ==> This code: 
              state.todos.splice(index1, 1); 
        ==> is wrong
        ==> Because Reducer is a pure function so we should not mutate the state directly
      */
      const index1 = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );

      // => Fix by using spread operator to clone the new state based on the old one then return new state
      const deteleToDosTemp = [...state.todos];
      deteleToDosTemp.splice(index1, 1);
      // setToLocalStorage(JSON.stringify(deteleToDosTemp));

      return {
        ...state,
        todos: deteleToDosTemp,
      };
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };
    default:
      return state;
  }
}

export default reducer;