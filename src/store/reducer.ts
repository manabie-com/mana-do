import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    //add SET_TODO action type to asign all tasks in local storage to todos
    case SET_TODO:
      state.todos = action.payload;
      return {
        ...state
      }

    case CREATE_TODO:
      console.log(state)
      state.todos.push(action.payload);

      // Store todos in localstorage
      localStorage.setItem('todos', JSON.stringify(state.todos));
      
      return {
        ...state,
        todos: state.todos
      };

    // CASE UPDATE TODO
    case UPDATE_TODO:
      const currentIndex = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[currentIndex].content = action.payload.content;
     
      // Store todos in localstorage
      localStorage.setItem('todos', JSON.stringify(state.todos));
      console.log(state);
      return {
        ...state,
        todos: state.todos
      };

    case UPDATE_TODO_STATUS:
      console.log(state)
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
   
      localStorage.setItem('todos', JSON.stringify(state.todos));
      
      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })
      // Store todos in localstorage
      localStorage.setItem('todos', JSON.stringify(tempTodos));

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      state.todos.splice(index1, 1);

      // Store todos in localstorage
      localStorage.setItem('todos', JSON.stringify(state.todos));

      return {
        ...state,
        todos: state.todos
      }

    case DELETE_ALL_TODOS:
      const length = state.todos.length;
      state.todos.splice(0, length); // 

      // Store todos in localstorage
      localStorage.setItem('todos', JSON.stringify(state.todos));
     
      return {  
        ...state,
        todos: state.todos
      }

    default:
      return state;
  }
}

export default reducer;