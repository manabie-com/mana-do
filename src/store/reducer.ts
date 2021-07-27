import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  
} from './actions';

import * as types from './../constants/ActionTypes';


export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = 

{
  todos: [],
  
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case types.CREATE_TODO:

     /* state.todos.push(action.payload);
      return {
        ...state
      }; */
      
      //Never use interfere directly with the state in redux
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };


    case types.UPDATE_TODO_STATUS:
      let newTodos = [...state.todos]
      const index2 = newTodos.findIndex((todo) => todo.id === action.payload.todoId);
      newTodos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      
      return {
        ...state,
        todos: newTodos,
      };
    

    case types.TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      });

      return {
        ...state,
        todos: tempTodos
      }

    case types.DELETE_TODO:
      let newTodos1 = [...state.todos]
      const index1 = newTodos1.findIndex((todo) => todo.id === action.payload);
      newTodos1.splice(index1, 1);

      return {
        ...state,
        todos: newTodos1
      }
    case types.DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;