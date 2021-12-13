import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  EDIT_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    // Keep switch case in curly braces to keep tempTodos in block scope
    case CREATE_TODO: {
      /** 
       state.todos.push(action.payload);
        return {
          ...state
        };
      */

      /**
       * Bug - causing duplicate Todos
       * Remove direct state update
       * Create a copy of the existing state and update values from there
       * Return updates values
      */

      const tempTodos = [...state.todos]
      tempTodos.push(action.payload)
      localStorage.setItem('todos', JSON.stringify(tempTodos))
      
      return {
        ...state,
        todos: tempTodos
      };
    }

    //Create an edit todo reducer to update the state of the edited todo item
    case EDIT_TODO: {
      const tempTodos = [...state.todos]
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.id)
      tempTodos[index2].content = action.payload.content

      localStorage.setItem('todos', JSON.stringify(tempTodos))

      return {
        ...state,
        todos: tempTodos
      }
    }

    case UPDATE_TODO_STATUS: {
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);

      /** 
       * Remove direct state update
       * Create a copy of the existing state and update values from there
       * Return updates values
      */

      const tempTodos = [...state.todos]
      tempTodos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      localStorage.setItem('todos', JSON.stringify(tempTodos))
      return {
        ...state,
        todos: tempTodos
      }
    }

    case TOGGLE_ALL_TODOS: {
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      localStorage.setItem('todos', JSON.stringify(tempTodos))

      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_TODO: {
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);

      /** 
       * Bug - causing multiple deletes
       * Remove direct state update
       * Create a copy of the existing state and update values from there
       * Return updates values
      */

      const tempTodos = [...state.todos]
      tempTodos.splice(index1, 1);

      localStorage.setItem('todos', JSON.stringify(tempTodos))

      return {
        ...state,
        todos: tempTodos
      }
    }

    case DELETE_ALL_TODOS: {
      localStorage.removeItem('todos')

      return {
        ...state,
        todos: []
      }
    }

    /** 
     * Add set todo for queried todos
    */
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      }
    }

    default:
      return state;
  }
}

export default reducer;