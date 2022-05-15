import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  SET_TODO,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
  UPDATE_ALL_STATUS
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      // If using push here, due to immutability issue, React always recommends that NEVER mutate state directly. Treat states as if it were immutable
      // Solution: clone that array
      // const newTodosArray : Todo[] = [...state.todos]
      // newTodosArray.push(action.payload);
      // return {
      //   ...state,
      //   todos: newTodosArray
      // };
      // OR in es6 as simple as this:
      return {
        todos: [...state.todos, action.payload]
      };
    case SET_TODO:
      return{
        todos: action.payload
      }

    case UPDATE_TODO_STATUS:
      // also immutability issues
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      const newTodosArray1 : Todo[] = [...state.todos];
      newTodosArray1[index2].status= action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: newTodosArray1
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
      // same with CREATE_TODO problem, immutability issue.
      // Solution: clone that array
      // const newTodosArray: Todo[] = [...state.todos]
      // const index1 = newTodosArray.findIndex((todo) => todo.id === action.payload);
      // newTodosArray.splice(index1, 1);
      // return {
      //   ...state,
      //   todos: newTodosArray
      // }
      // OR I find it more delicate using filter method instead:
      const newTodosArray : Todo[] = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos: newTodosArray
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
      // Adding edit mode for todo content:
    case UPDATE_TODO_CONTENT:
      const index3 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      const newTodosArray2 : Todo[] = [...state.todos];
      newTodosArray2[index3].content = action.payload.newTodo;

      return {
        ...state,
        todos: newTodosArray2
      }
    
    case UPDATE_ALL_STATUS:
      const newTodosArray3 : Todo[] = [...state.todos]
      newTodosArray3.map(todo => action.payload ? todo.status = TodoStatus.COMPLETED : todo.status = TodoStatus.ACTIVE)
      return {
        ...state,
        todos: newTodosArray3
      }
    default:
      return state;
  }
}

export default reducer;