import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  UPDATE_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

const setLocalStorage = (item: any[]) => {
  const todos_stringify = JSON.stringify(item)
  localStorage.setItem('todos', todos_stringify)
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      const not_duplicate = state.todos.every((value: Record<string, any>) => (value?.id !== action.payload.id && action.payload.content.toLowerCase() !== value?.content.toLowerCase()))
      if (not_duplicate) {
        state.todos.push(action.payload)
      }
      setLocalStorage(state.todos)
      return {
        ...state
      };

    case SET_TODO:
      // ** For set Todo from local storage
      if (!action.payload) {
        return {
          ...state,
          todos: []
        }
      }

      return {
        ...state,
        todos: action.payload
      }


    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      if (index2 >= 0) {
        state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
      }
      setLocalStorage(state.todos)
        ;
      return {
        ...state,
        todos: state.todos
      }


    case UPDATE_TODO:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const not_duplicate_todo_update = state.todos.every((value: Record<string, any>) => (action.payload.content?.toLocaleLowerCase() !== value?.content.toLowerCase()))
      if (index3 >= 0 && not_duplicate_todo_update) { /// ** guard for index1 incase it will return negative number. If the index1 is positive it will delete the specific index of the array
        state.todos[index3].content = action.payload.content ?? '';
      }
      setLocalStorage(state.todos)

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

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const index1: number = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index1 >= 0) { /// ** guard for index1 incase it will return negative number. If the index1 is positive it will delete the specific index of the array
        state.todos.splice(index1, 1);
      }
      setLocalStorage(state.todos)
      return {
        ...state,
        todos: state.todos
      }
    case DELETE_ALL_TODOS:
      localStorage.removeItem('todos')  // ** To remove storage item by adding key 
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;